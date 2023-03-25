import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import * as interfaces from '../../interfaces/interfaces';

export const validateBody = (body: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await body.validateAsync(req.body);

            next();
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }
};

export const payloads = {
    user: {
        signup: Joi.object<interfaces.IUser>({
            email: Joi.string().trim().pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)).required(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/)).required(),
            role: Joi.string().valid('authority', 'reporter').required()
        }),
        login: Joi.object<interfaces.IUser>({
            email: Joi.string().trim().pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)).required(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/)).required()
        })
    }
};
