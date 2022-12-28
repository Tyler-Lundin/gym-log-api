import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcryptjs';


const registerUser = async ( req: Request, res: Response ) => {
	let { email = '', password = '' } = req.body;
	if (email === '' || password === '') return res.status(400).json({ message: 'Missing fields', redirect: '' });
	email = email.toLowerCase();
	try {
		const user = await User.findOne({ email });
		if ( user ) return res.status(400).json({ message: 'User already exists', redirect: '/auth/login' });

		const passwordHash = await bcrypt.hash( password, 10 );

		const newUser = new User({
			email,
			password: passwordHash
		});

		await newUser.save();
		return res.status(200).json({ message: 'User created successfully', redirect: '/auth/login' });
	}
	catch (error: any) {
		console.log( { error } );
		return res.status(500).json({ message: 'Internal server error', redirect: '' });
	}
};
export default registerUser;
