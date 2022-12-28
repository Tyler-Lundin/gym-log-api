import { Request, Response, NextFunction } from 'express';

const getMonth = ( req: Request, res: Response, next: NextFunction ) => { try {

        const { userId } = req;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { month } = req.body;
        req.month = month;
        next();

}
catch (error: any) {
    let message = error.message || 'Something went wrong';
    return res.status(500).json({ message });
}}


export default getMonth;

