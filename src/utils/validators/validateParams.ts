import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export const validateParams = (params: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await params.validateAsync(req.params);

            next();
        } catch (error) {
            return res.status(500).json({
                error: 'Params validation failed. ' + error
            })
        }
    }
}


export const params = {
    user: {
        getData: Joi.object({
            date: Joi.string().pattern(new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)).required(),
            location: Joi.string().trim().required(),
            type: Joi.string().trim().required()
        })
    }
}

