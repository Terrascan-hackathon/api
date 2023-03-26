import { Types } from 'mongoose'

export interface IPayload {
    id: Types.ObjectId,
    email: string,
    role: string,
    iat: number,
    exp: number
};

export interface IAuth {
    accessToken: string,
    refreshToken: string
};
