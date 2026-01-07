import express, { urlencoded } from 'express';
import router from './routes/index.js';
import { connectDB } from '#db/config.js';
import { errorHandler } from '../middleware/error-handler.js';
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
connectDB();

app.use(cookieParser());
app.use('/', router);

//run this route at last
app.use((req, res) => {
  res.send('Rider Service');
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log('Rider Service running on port 3001');
});