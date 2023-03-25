import express, { Request, Response } from 'express';
import userController from '../controllers/user/user.controller';
import utils from '../utils/utils';

const userRoutes = express.Router();

userRoutes.post('/signup', utils.validateBody(utils.payloads.user.signup), userController.register);
userRoutes.post('/login', utils.validateBody(utils.payloads.user.login), userController.login);
userRoutes.post('/logout', utils.validateAccessToken, userController.logout);

userRoutes.get('/hello', utils.validateAccessToken, (req: Request, res: Response) => {
    const plain = 'Hello world!';

    const encrypted = utils.encrypt(plain);

    const decrypted = utils.decrypt(encrypted);

    return res.status(200).json({
        encrypted,
        decrypted
    })
})

export default userRoutes;
