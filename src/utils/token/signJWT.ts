import jwt from 'jsonwebtoken';
import * as interfaces from '../../interfaces/interfaces';
import config from '../../config/env.config';
import utils from '../utils';

const userCreateToken = (user: interfaces.IUser, generateNewRefreshToken: boolean = true): interfaces.IAuth => {
    const accessTokenPlain = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        config.token.accessSecret,
        {
            algorithm: 'HS256',
            expiresIn: config.token.access_token_expireTime
        }
    );

    const refreshTokenPlain = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        config.token.refreshSecret,
        {
            algorithm: 'HS256',
            expiresIn: config.token.refresh_token_expireTime
        }
    );
    
    const accessToken = utils.encrypt(accessTokenPlain);
    const refreshToken = utils.encrypt(refreshTokenPlain);

    if (!generateNewRefreshToken) {
        return { accessToken } as interfaces.IAuth;
    }
    return { accessToken, refreshToken } as interfaces.IAuth;
};

export default userCreateToken;