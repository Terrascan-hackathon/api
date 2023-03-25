import config from "../../config/env.config";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import * as interfaces from '../../interfaces/interfaces';
import utils from "../utils";

const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const route = req.originalUrl;
        const cookieAccessTokenAge = config.server.development ? `Max-Age=${60 * 60 * 24}` : `Max-Age=${60 * 60 * 24}`;
        const cookieOptions = config.server.development ? `` : ``;
        const redirectUrl = 'http://localhost:5173' + route;
        
        if (!req.headers.cookie) {
            return res.status(401).json({
                error: 'Authorization is missing.'
            })
        }

        const tokens = req.headers.cookie;

        if (!tokens.includes('accessToken=') && !tokens.includes('refreshToken=')) {
            return res.status(401).json({
                error: 'Authorization is missing.'
            })
        }

        if (!tokens.includes('accessToken=')) {
            const refreshTokenEncrypted = tokens.split('refreshToken=')[1].slice(0, 197);
            const refreshToken = utils.decrypt(refreshTokenEncrypted);

            const { auth, error } = await utils.refreshToken(refreshToken) as interfaces.IRefreshTokenResponse;

            if (error) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            }

            if (auth) {
                if (auth.accessToken && auth.refreshToken) {
                    return res
                        .setHeader(
                            'Set-Cookie', [
                                `accessToken=${auth.accessToken}; ${cookieAccessTokenAge}; ${cookieOptions}`,
                                `refreshToken=${auth.refreshToken}; Max-Age=${60 * 60 * 24 * 90}; ${cookieOptions}`
                            ]
                        )
                        .redirect(307, redirectUrl);
                } else if (auth.accessToken && !auth.refreshToken) {
                    return res
                        .setHeader(
                            'Set-Cookie', [
                                `accessToken=${auth.accessToken}; ${cookieAccessTokenAge}; ${cookieOptions}`
                            ]
                        )
                        .redirect(307, redirectUrl);
                }
            }
        }
        
        const cookies = tokens.split(';');

        const accessTokenCoookie = cookies.filter(cookie => {
            if (cookie.includes('accessToken=')) {
                return cookie.trim();
            }
        })

        if (accessTokenCoookie.length === 0) {
            return res.status(401).json({
                error: 'Authorization is missing.'
            })
        }

        const accessTokenEncrypted = accessTokenCoookie[0].split('accessToken=')[1];
        const accessToken = utils.decrypt(accessTokenEncrypted);

        const accessSecret = config.token.accessSecret;

        let decodedAccessToken = jwt.verify(accessToken, accessSecret) as interfaces.IPayload;

        const user = await utils.getUser(decodedAccessToken);

        if (!user) {
            return res.status(403).json({
                error: 'Authorization error.'
            })
        }

        if (user._id.toString() !== decodedAccessToken.id.toString()) {
            return res.status(401).json({
                error: 'Invalid token.'
            })
        }

        const now = new Date();
        if (decodedAccessToken.exp * 1000 < now.getTime()) {
            return res.status(403).json({
                error: 'Token expired.'
            })
        }

        const role = decodedAccessToken.role;

        if (
            (role === 'authority' && !route.includes('/api/users')) ||
            (role === 'reporter' && !route.includes('/api/users'))
        ) {
            return res.status(403).json({
                error: 'Forbidden. Protected route.'
            })
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            error: 'Token validation failed. ' + error
        })
    }
};

export default validateAccessToken;