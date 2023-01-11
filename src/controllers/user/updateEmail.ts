import { Request, Response } from 'express';
import UserModel from '../../models/user';

const updateUserEmail = async ( req: Request, res: Response ) => {
	const { userId, body } = req
	const { email } = body

	try {
		const user = await UserModel.findOneAndUpdate({ _id: userId}, { email });
		if (!user) return res.status(404).json({ message: 'User not found' });
		return res.status(200).json({ message: 'User email updated' });
	} catch (error: any) {
		return res.status(500).json({ error: 'Internal server error' });
	}
}

export default updateUserEmail;
