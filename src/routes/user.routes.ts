import express, { Request, Response } from 'express';
import userController from '../controllers/user/user.controller';
import utils from '../utils/utils';

const parser = require('xml2json');

import * as fs from 'fs';

const userRoutes = express.Router();

userRoutes.post('/signup', utils.validateBody(utils.payloads.user.signup), userController.register);
userRoutes.post('/login', utils.validateBody(utils.payloads.user.login), userController.login);
userRoutes.post('/logout', utils.validateAccessToken, userController.logout);

userRoutes.get('/hello', utils.validateAccessToken, async (req: Request, res: Response) => {
    try {
        const api_key = 'eyJ4NXQiOiJNMk5oTldaaE9HTXhOR016T1Roak9UTXpObVpqWkdKa01EZ3hNbUV5WVRaak1qQmtZakZoWVROak5XUTFPREUxTTJJNU5XUXpZMlF3T0RjeE56STJaQSIsImtpZCI6Ik0yTmhOV1poT0dNeE5HTXpPVGhqT1RNek5tWmpaR0prTURneE1tRXlZVFpqTWpCa1lqRmhZVE5qTldRMU9ERTFNMkk1TldRelkyUXdPRGN4TnpJMlpBX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiSktvdjJGbmVzb0hieXRhajlMZ29uQSIsInN1YiI6ImFkcmlhbi5tb2xvY2FAc21hcnRib3hkaWdpdGFsLmNvbSIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwicm9sZXMiOlsiRG9ja2VyUmVwb3NpdG9yeUFjY2VzcyIsIkludGVybmFsXC9pZGVudGl0eSIsIkludGVybmFsXC9ldmVyeW9uZSJdLCJpc3MiOiJodHRwczpcL1wvaWRlbnRpdHkubXVuZGl3ZWJzZXJ2aWNlcy5jb206NDQzXC9vYXV0aDJcL3Rva2VuIiwibGFzdF9uYW1lIjoiTW9sb2NhIiwic2lkIjoiZmFlZGRiNzEtYjIxYy00ZTZjLTk3NzAtZTY2NjM1MDliZjFiIiwiYXVkIjoiZVdabE0yZEp2bmZReTh6VldLdnlBY0VSX0xZYSIsImNfaGFzaCI6Im5wcklQbEFQcGpqR0h6c3o4bUtvc1EiLCJuYmYiOjE2Nzk2ODYxMjksImF6cCI6ImVXWmxNMmRKdm5mUXk4elZXS3Z5QWNFUl9MWWEiLCJleHAiOjE2ODA1MzIxMjksImlhdCI6MTY3OTY4NjEyOSwiZmlyc3RfbmFtZSI6IkFkcmlhbiIsImVtYWlsIjoiYWRyaWFuLm1vbG9jYUBzbWFydGJveGRpZ2l0YWwuY29tIn0.taCwCDIWporFzFB4xjivhKHbxMqqB8pJu91fJbAJFO8yrp6x3XHeW0Xc7F8Jm9HteYcXU0IOMctDrFlI9Weomg7dk9TXipkVM5BgvfJDpfFjk_9V7SqQyWBCLviw5A-uTH7SD_c6cPffNd03fSy5kj5CH5n0OgEHN81d9BqC504d6ptC4hhTf63XaNGGjPOpCZG6eVx18yzMbjL19MhxsYusxnv0VdV2VUQY9lNMqhPpmo6yy41oRHC_Wz9xnYQa8YzeMldVt8oVKoXt9cbMUwJxkxIU5s0s14TPeTUHiuK7GqcibdAKwl4au7EzKquhI8ZPllgnqWUU7uGIg2QJ6A';
        const dataLinks = utils.dataLinks;

        const dataLinksLength = dataLinks.length;

        const dataArray = new Array();

        for (let index = 0; index < dataLinksLength; index++) {
            await fetch(dataLinks[index], {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    Cookie: `seeedtoken=${api_key}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            })
                .then((response) => response.text())
                .then((response) => {
                    const responseBuffer = parser.toJson(response);
                    const jsonData = JSON.parse(responseBuffer);

                    dataArray.push(jsonData);
                })
        }

        const dataArrayLength = dataArray.length;

        for (let j = 0; j < dataArrayLength; j++) {
            const stringifyData = JSON.stringify(dataArray[j], null, 4);
            fs.writeFileSync(`./files/response-${j}.json`, stringifyData)
        }

        return res.status(200).json({
            message: 'Success!'
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export default userRoutes;
