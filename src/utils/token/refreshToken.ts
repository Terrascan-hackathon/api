import config from "../../config/env.config";
import * as interfaces from '../../interfaces/interfaces';
import models from "../../models/models";
import jwt from 'jsonwebtoken';
import utils from "../utils";

const refreshToken = async (refreshToken: string): Promise<interfaces.IRefreshTokenResponse | undefined> => {
    try {
        let generateNewRefreshToken: boolean = false;

        const decodedRefreshToken = jwt.verify(refreshToken, config.token.refreshSecret) as interfaces.IPayload;
        const id = decodedRefreshToken.id;

        const now = new Date();

        if (decodedRefreshToken.exp * 1000 - now.getTime() < (1000 * 60 * 1)) {
            generateNewRefreshToken = true;
        }

        const user = await models.User.findById(id);

        if (!user) {
            return {
                error: {
                    message: 'User not found.',
                    statusCode: 404
                }
            }
        }

        const auth = utils.userCreateToken(user, generateNewRefreshToken);

        return { auth };
    } catch (error) {
        return {
            error: {
                message: 'Refresh token failed.',
                statusCode: 500
            }
        };
    }
};

export default refreshToken;