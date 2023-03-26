import { Request, Response, NextFunction } from "express";
import utils from "../../utils/utils";

const getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            date,
            location,
            type
        } = req.params;

        const validDate = utils.validateDate(date);

        if (!validDate) {
            return res.status(400).json({
                error: 'Invalid date.'
            })
        }

        const dateBuffer = new Date(date);

        const year = dateBuffer.getFullYear();
        const month = dateBuffer.getMonth();
        const day = dateBuffer.getDate();

        return res.status(200).json({
            ok: 'ok'
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default getData;
