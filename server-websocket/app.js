//app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.use(helmet());

app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;