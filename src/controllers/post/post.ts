import * as interfaces from '../../interfaces/interfaces';
import models from '../../models/models';
import { Request, Response, NextFunction, response } from 'express';
import mongoose from 'mongoose';

const post = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            title,
            severity,
            description,
            image
        } = req.body;

        const post: interfaces.IPost = new models.Post({
            _id: new mongoose.Types.ObjectId,
            title,
            severity,
            description,
            image
        })

        await post
            .save()
            .then(() => {
                return res.status(201).json({
                    message: 'Successfully posted.'
                })
            })
            .catch((err: string) => {
                return res.status(500).json({
                    error: `Post failed. ${err}`
                })
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default post;
