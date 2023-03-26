import models from '../../models/models';
import { Request, Response, NextFunction } from 'express';

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await models.Post
            .find()
            .then((posts) => {
                return res.status(200).json({
                    posts
                })
            })
            .catch((err: string) => {
                error: `Getting posts failed. ${err}`
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default getPosts;
