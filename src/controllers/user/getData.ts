import { Request, Response, NextFunction } from "express";
import utils from "../../utils/utils";
import { exec } from 'child_process';
import * as fs from 'fs';

const countryPath = 'country.png';
const temperaturePath = 'temperature.png';

const convertBase64 = (path: string) => {
    const bitmap = fs.readFileSync(path);
    const base64 = bitmap.toString('base64');
    return base64;
}

const pythonCommandCountry = async (location: string) => {
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
};

const pythonCommandAnalyze = async (location: string) => {
    exec(`python3 python/ml/temperature.py ${location}`, (error, stdout, stderr) => {
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
}

const getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            location
        } = req.params;

        await pythonCommandCountry(location)
            .then(async () => {
                await pythonCommandAnalyze(location).then(() => {
                    setTimeout(() => {
                        const country = convertBase64(countryPath);
                        const temperature = convertBase64(temperaturePath);

                        return res.status(200).json({
                            country,
                            temperature
                        })
                    }, 3000)
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
