import express from 'express';
import { connectDB } from '#db/config.js';
import { errorHandler } from '../middleware/error-handler.js';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use(cookieParser());
app.use('/', router);

app.use(errorHandler);

app.listen(3003, () => {
    console.log('Ride Service running on port 3003');
});