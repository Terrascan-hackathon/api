import { Request, Response, NextFunction } from "express";
import config from "../../config/env.config";
import decodeAccessToken from "../../utils/token/decodeAccessToken";
import * as interfaces from '../../interfaces/interfaces';
import models from "../../models/models";

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const domain = config.server.development ? "http://127.0.0.1:5050" : "http://localhost:5137";
        const { id } = decodeAccessToken(req, res) as interfaces.IPayload;

        const userProfile = await models.User.findById(id);

        if (!userProfile) {
            return res.status(404).json({
                error: 'User not found.'
            })
        }

        userProfile.loggedIn = false;

        await userProfile
            .save({
                validateModifiedOnly: true
            })
            .then(() => {
                return res
                .setHeader("Access-Control-Allow-Credentials", 'true')
                .setHeader("Access-Control-Allow-Origin", domain)
                .setHeader(
                    'Set-Cookie', [
                        `accessToken=; Max-Age=0`,
                        `refreshToken=; Max-Age=0`
                    ]
                )
                .status(200).json({
                    message: 'Logged out successfully.'
                })
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default logout;
