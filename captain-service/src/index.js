import express from 'express';
import router from './routes/index.js';
import { connectDB } from '#db/config.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();  

app.use('/', router);

//run this route at last
app.use((req, res) => {
  res.send('Captain Service');
});

app.listen(3002, () => {
  console.log('Captain Service running on port 3002');
});