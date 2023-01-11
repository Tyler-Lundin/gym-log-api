import { randomUUID } from 'crypto';
import UserModel from '../../models/user';
import { Request, Response } from 'express';

const logoutUser = async ( req: Request, res: Response ) => {
    const { userId } = req;
    if (!userId) return res.status(400).json({ message: 'User not found' });

    try {
        const user = await UserModel.findOneAndUpdate({ _id: userId }, { sessionId: randomUUID() });
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User logged out' });
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default logoutUser;
