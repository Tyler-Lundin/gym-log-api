import { connect, set } from "mongoose";

set('strictQuery', false);
const connectDatabase = async () => {
	try {
		const connection = connect(process.env.MONGO_URI as string, (err) => {
			if (err) {
				console.log(err);
			}
		});
        // what is the escape code for white background and black text?
        console.log( '\x1b[47m\x1b[30m%s\x1b[0m', 'Database connected' );
		return connection;
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDatabase;
