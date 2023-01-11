import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcryptjs';
import generateJWT from '../../utils/generateJWT';


type reqBody = {
    username: string;
    email: string;
    password: string;
}

const registerUser = async ( req: Request, res: Response ) => {
    let { username, email, password } = req.body as reqBody;
	if (!username) return res.status(400).json({ message: 'Missing Username', redirect: '' });
    if (!email) return res.status(400).json({ message: 'Missing Email', redirect: '' });
    if (!password) return res.status(400).json({ message: 'Missing Password', redirect: '' });

	email = email.toLowerCase();
    username = username.toLowerCase();

	try {
		const user = await User.findOne({ $or: [{ email }, { username }] });
		if ( user ) return res.status(400).json({ message: 'User already exists', redirect: '/auth/login' });

		const passwordHash = await bcrypt.hash( password, 10 );

		const newUser = new User({
            username,
			email,
			password: passwordHash
		});

		await newUser.save();
        const uid = String(newUser._id);
        const authToken = generateJWT( uid, newUser.sessionId );
		return res.status(200).json({
			authToken,
			message: 'Registration success!',
			sessionToken: newUser.sessionId,
            redirect: '/'
		});
	}
	catch (error: any) {
		console.log( { error } );
		return res.status(500).json({ message: 'Internal server error', redirect: '' });
	}
};
export default registerUser;
