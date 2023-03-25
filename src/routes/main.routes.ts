import express, { Request, Response } from 'express';

const mainRoutes = express.Router();

mainRoutes.get('/hello', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Hello world!'
    })
})
export default mainRoutes;