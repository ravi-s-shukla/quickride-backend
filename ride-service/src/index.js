import express from 'express';
import { connectDB } from '#db/config.js';
const app = express();

app.use(express.json());

connectDB();
app.use('/', (req, res) => {
    res.send('Ride Service');
});

app.listen(3003, () => {
    console.log('Ride Service running on port 3003');
});