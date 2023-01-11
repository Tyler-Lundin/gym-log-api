import bcrypt from 'bcryptjs';

export default ( password: string, hash: string ):boolean => {
	return bcrypt.compareSync( password, hash );
}

