import dotenv from 'dotenv';

dotenv.config();

// ------------- MongoDB -------------
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

// ------------- SERVER --------------
const SERVER_PORT = process.env.SERVER_PORT || 5050;

const config = {
    mongo: {
        uri: MONGO_URI
    },
    server: {
        port: SERVER_PORT
    }
};

export default config;
