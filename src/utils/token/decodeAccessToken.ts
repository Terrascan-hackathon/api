import jwt from 'jsonwebtoken';
import config from '../../config/env.config';
import { Request, Response } from 'express';
import * as interfaces from '../../interfaces/interfaces';
import utils from '../utils';

const decodeAccessToken = (req: Request, res: Response): interfaces.IPayload | unknown  => {
    try {
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

        const cookies = tokens.split(';');
        const accessTokenCoookie = cookies.filter(cookie => {
            if (cookie.includes('accessToken=')) {
                return cookie.trim();
            }
        })

        const accessTokenEncrypted = accessTokenCoookie[0].split('accessToken=')[1];
        const accessToken = utils.decrypt(accessTokenEncrypted);

        const decoded = jwt.verify(accessToken, config.token.accessSecret) as interfaces.IPayload;

        return {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email
        };
    } catch (error) {
        return res.status(500).json({
            error: 'Decoding accessToken failed. ' + error
        })
    }
};

export default decodeAccessToken;
