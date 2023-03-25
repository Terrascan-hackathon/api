import { Request, Response, NextFunction } from "express";
import * as interfaces from '../../interfaces/interfaces';
import utils from "../../utils/utils";
import models from "../../models/models";
import config from "../../config/env.config";
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
            password
        } = req.body;

        // const domain = config.server.development ? "http://127.0.0.1:5050" : "http://localhost:5137";
        const cookieOptions = config.server.development ? `` : ``;
        const cookieAccessTokenAge = config.server.development ? `Max-Age=${60 * 60 * 24}` : `Max-Age=${60 * 60 * 24}`;

        const trimmedLowewercaseEmail = email.toLowerCase().trim();

        const userProfile = await models.User.findOne({ email: trimmedLowewercaseEmail});

        if (!userProfile) {
            return res.status(404).json({
                error: 'User not found.'
            })
        }

        const validPassword = await bcrypt.compare(password, userProfile.password);

        if (!validPassword) {
            return res.status(400).json({
                error: 'Wrong password.'
            })
        }

        userProfile.password = '';

        const { accessToken, refreshToken }: interfaces.IAuth = utils.userCreateToken(userProfile);

        return res
            // .setHeader("Access-Control-Allow-Credentials", 'true')
            // .setHeader("Access-Control-Allow-Origin", domain)
            .setHeader(
                'Set-Cookie', [
                    `accessToken=${accessToken}; ${cookieAccessTokenAge}; ${cookieOptions}`,
                    `refreshToken=${refreshToken}; Max-Age=${60 * 60 * 24 * 90}; ${cookieOptions}`
                ]
            )
            .status(200).json({
                message: 'Logged in successfully.',
                user: userProfile
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default login;
