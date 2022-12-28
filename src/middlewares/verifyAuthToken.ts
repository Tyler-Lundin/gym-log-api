import {Request, NextFunction, Response} from "express"
import jwt from 'jsonwebtoken';


type TokenPayload = { userId: string, iat: number, exp: number };

const verifyAuthToken = ( req: Request, res: Response, next: NextFunction ) => {

	const authHeader = req.headers['authorization'] as string;
	if (!authHeader) return res.status(401).json({ error: 'Missing Auth Header' });

	const authToken = authHeader.split(' ')[1];
	if (!authToken) return res.status(401).json({ error: 'Missing Auth Token' });

	const sessionHeader = req.headers['session'] as string;
	if (!sessionHeader) return res.status(401).json({ error: 'Missing Session Header' });
	const sessionToken = sessionHeader.split(' ')[1];
	if (!sessionToken) return res.status(401).json({ error: 'Missing Auth Token' });

	try {
		const verified = jwt.verify(authToken, `${process.env.JWT_SECRET}-${sessionToken}`);
		if (!verified) return res.status(401).json({ error: 'Invalid Token' });
		const { userId } = verified as TokenPayload;
		req.userId = userId;
		next();
	}
	catch (err: any) {
		return res.status(400).json({ error: 'Invalid token' });
	}
}

export default verifyAuthToken;
