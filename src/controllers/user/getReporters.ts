import { Request, Response, NextFunction } from "express";
import models from "../../models/models";

const getReporters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await models.User
            .find({role: 'reporter'})
            .then((reporters) => {
                return res.status(200).json({
                    reporters
                })
            })
            .catch((err: string) => {
                return res.status(500).json({
                    error: `Getting reporters failed. ${err}`
                })
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default getReporters;
