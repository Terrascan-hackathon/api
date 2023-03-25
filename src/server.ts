import express from 'express';
import connectDB from './utils/database/connectDB';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = 5050;

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(bodyParser.json({
    limit: '500mb'
}));

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
