import express from 'express';
import utils from './utils/utils';
import cors from 'cors';
import bodyParser from 'body-parser';
import mainRoutes from './routes/main.routes';
import config from './config/env.config';

const PORT = 5050;

const app = express();

// Connect to MongoDB
utils.connectDB();

const corsOrigin = config.server.development ? true : 'http://localhost:5173';

app.use(cors({
    origin: corsOrigin,
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

app.use('/terrascan/api', mainRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
