import express from 'express';
import router from './routes/index.js';
import { connectDB } from '#db/config.js';
import cookieParser from "cookie-parser";
import { errorHandler } from '../middleware/error-handler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();  

app.use(cookieParser());
app.use('/', router);

app.use(errorHandler);

app.listen(3002, () => {
  console.log('Captain Service running on port 3002');
});