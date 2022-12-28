import {  Request, Response } from 'express';
import User from '../../models/user';
import comparePassword from '../../utils/comparePassword';
import generateJWT from '../../utils/generateJWT';

const loginUser = async (req: Request, res: Response) => {
	let { email = '', password = '' } = req.body;
	try {
		if ( email === '' || password === '' ) return res.status(400).json({ message: 'Missing Fields' });
		email = email.toLowerCase();
		const user = await User.findOne({ email });
		if ( !user ) return res.status(400).json({ message: 'User not found' });
		const isMatch = comparePassword(password, user.password)
		if ( !isMatch ) return res.status(400).json({ message: 'Invalid credentials' });
		const authToken = generateJWT(user._id, user.sessionId);
		return res.status(200).json({
			authToken,
			message: 'Authentication successful',
			sessionToken: user.sessionId,
		});
	}
	catch (error: any) {
		console.log( { error } );
		return res.status(500).json({ message: 'Internal server error' });
	}

};

export default loginUser;
