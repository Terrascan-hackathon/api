import { Request, Response, NextFunction } from "express";
import utils from "../../utils/utils";
import { exec } from 'child_process';
import * as fs from 'fs';
const resizebase64 = require('resize-base64');

const filePath = 'country.png';

const convertBase64 = (path: string) => {
    const bitmap = fs.readFileSync(path);
    const base64 = bitmap.toString('base64');
    const resized = resizebase64(base64, 800, 600);
    return resized;
}

const pythonCommand = async (location: string) => {
    let executed: boolean = false;

    exec(`python3 python/ml/country_box.py ${location}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(stdout);
            executed = true;
        }
    })

    return executed;
}

const getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            location
        } = req.params;

        // exec(`python3 python/ml/country_box.py ${location}`, (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`error: ${error.message}`);
        //     }
        //     else if (stderr) {
        //         console.log(`stderr: ${stderr}`);
        //     }
        //     else {
        //         console.log(stdout);
        //     }
        // })

        await pythonCommand(location)
            .then(() => {
                const pythonResponse = convertBase64(filePath);

                return res.status(200).json({
                    pythonResponse
                })
            })
            .catch(() => {
                return res.status(500).json({
                    error: 'Something went wrong.'
                })
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default getData;
