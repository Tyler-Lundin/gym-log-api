import jwt from 'jsonwebtoken';

export default ( userId: string, sessionId: string ) => {
	return jwt.sign({ userId }, `${process.env.JWT_SECRET}-${sessionId}` as string, { expiresIn: '7 days' });
};

