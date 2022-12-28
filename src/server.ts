import Express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Router from './routes';
import connectDatabase from './services/connectMongo.db';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = Express();

connectDatabase();

// cors is a security feature that allows us to make requests from a different domain
app.use(cors());
// cookieParser is a middleware that parses cookies attached to the client request object
app.use(cookieParser());
// compression is a middleware that compresses the response bodies for all requests that traverse through the middleware
app.use(compression());
// bodyParser is a middleware that parses the body of the request and attaches it to the request object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// morgan is a middleware that logs all requests to the console
app.use(morgan('common'));
// helmet is a middleware that helps secure Express apps by setting various HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

app.use('/api', Router);

const PORT = process.env.PORT || 3500;
// q. what is the escape code for green background and black text?
// a. '\x1b[42m\x1b[30m%s\x1b[0m'
app.listen( PORT, () => console.log('\x1b[42m\x1b[30m%s\x1b[0m', `[ Server is running on port ${PORT} ]`));

