import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import * as interfaces from '../../interfaces/interfaces';
import models from "../../models/models";
import utils from '../../utils/utils';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
            password,
            role
        } = req.body;

        const trimmedLowercaseEmail = email.toLowerCase().trim();
        
        const userExists = await utils.checkUserExistance(trimmedLowercaseEmail);

        if (userExists) {
            return res.status(409).json({
                error: 'User already registered with this email address.'
            })
        }

        const user: interfaces.IUser = new models.User({
            _id: new mongoose.Types.ObjectId,
            email: trimmedLowercaseEmail,
            password,
            role
        })

        await user
            .save()
            .then(() => {
                return res.status(201).json({
                    message: 'Successfully signed up.'
                })
            })
            .catch((err: string) => {
                return res.status(500).json({
                    error: `Signup failed. ${err}`
                })
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default register;
