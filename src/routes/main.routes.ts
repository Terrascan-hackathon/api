import express, { Request, Response } from 'express';
import userRoutes from './user.routes';
import utils from '../utils/utils';

const mainRoutes = express.Router();

mainRoutes.use('/users', userRoutes);

mainRoutes.get('/hello', utils.validateAccessToken, (req: Request, res: Response) => {
    const plain = 'Hello world!';

    const encrypted = utils.encrypt(plain);

    const decrypted = utils.decrypt(encrypted);

    return res.status(200).json({
        encrypted,
        decrypted
    })
})
export default mainRoutes;