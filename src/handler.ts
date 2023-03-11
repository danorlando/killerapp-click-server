/* eslint-disable import/no-extraneous-dependencies */
import serverlessHttp from 'serverless-http';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/main.router';
import errorHandler from './middlewares/error.middleware';
import notFoundHandler from './middlewares/not-found.middleware';

// if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
//   throw new Error(
//     'Missing required environment variables. Check docs for more info.'
//   );
// }

const PORT = parseInt(process.env.PORT!, 10);
// const { CLIENT_ORIGIN_URL } = process.env;

const app = express();
app.use(bodyParser.json());
app.set('json spaces', 2);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        'default-src': ["'none'"],
        'frame-ancestors': ["'none'"],
      },
    },
    frameguard: {
      action: 'deny',
    },
  })
);

app.use((_req, res, next) => {
  res.contentType('application/json; charset=utf-8');
  next();
});
app.use(nocache());

app.use(
  cors({
    // origin: CLIENT_ORIGIN_URL,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  })
);
// app.use(cors());

app.use(mainRouter);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});

// eslint-disable-next-line import/prefer-default-export
export const handler = serverlessHttp(app);
