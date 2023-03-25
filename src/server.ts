import express from 'express';
import connectDB from './utils/database/connectDB';

const PORT = 5050;

const app = express();

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
