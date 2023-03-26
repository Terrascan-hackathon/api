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
            location: Joi.string().trim().required()
        })
    }
}

