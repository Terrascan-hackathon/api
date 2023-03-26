import { Request, Response, NextFunction } from "express";
import utils from "../../utils/utils";
import { exec } from 'child_process';

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

        // const data = req.body.data;
        // spawn('python', ['hello.py', "Ro"]);
        exec(`python3 python/ml/country_box.py ${location}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            else if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            else {
                console.log(stdout);
            }
        })
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
