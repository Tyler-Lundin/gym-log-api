import bcrypt from 'bcryptjs';

export default ( password: string, hash: string ) => {
	console.log( { password, hash } );
	return bcrypt.compareSync( password, hash );
}

