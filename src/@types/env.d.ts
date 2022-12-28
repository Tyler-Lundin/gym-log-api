export {} 

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			PORT: string;
			JWT_SECRET: string;
			JWT_EXPIRES: string;
			MONGO_URI: string;
			SMTP_HOST: string;
			SMTP_PORT: string;
			SMTP_USER: string;
			SMTP_PASS: string;
		}
	}
}
