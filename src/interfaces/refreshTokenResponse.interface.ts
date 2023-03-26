import * as interfaces from './interfaces';

interface IRefreshTokenResponse {
    auth?: interfaces.IAuth
    error?: interfaces.IError
};

export default IRefreshTokenResponse;
