import { Request, Response, NextFunction } from "express";
import utils from "../../utils/utils";
import { exec } from 'child_process';
import * as fs from 'fs';

const filePath = 'country.png';

const convertBase64 = (path: string) => {
    const bitmap = fs.readFileSync(path);
    return bitmap.toString('base64');
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

        const executed = await pythonCommand(location);

        if (executed) {
            const pythonResponse = convertBase64(filePath);

            return res.status(200).json({
                pythonResponse
            })
        } else {
            return res.status(500).json({
                error: 'Something went wrong.'
            })
        }

  
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default getData;
