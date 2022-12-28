import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import User from '../../models/user';

const UpdateUserEmail = async ( req: Request, res: Response ) => {
	const { userId, body } = req
	const { email } = body

	try {
		const user = await User.findOneAndUpdate({ _id: userId}, { email });
		if (!user) return res.status(404).json({ message: 'User not found' });
		return res.status(200).json({ message: 'User email updated' });
	} catch (error: any) {
		return res.status(500).json({ error: 'Internal server error' });
	}
}

const LogoutUser = async ( req: Request, res: Response ) => {
    const { userId } = req;
    if (!userId) return res.status(400).json({ message: 'User not found' });

    try {
        const user = await User.findOneAndUpdate({ _id: userId }, { sessionId: randomUUID() });
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User logged out' });
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    UpdateUserEmail,
    LogoutUser,
};
