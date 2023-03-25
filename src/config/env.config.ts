import dotenv from 'dotenv';

dotenv.config();

// ------------- MongoDB -------------
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

// ------------- SERVER --------------
const SERVER_PORT = process.env.SERVER_PORT || 5050;

// ---------------------------- CRYPTO --------------------

const CRYPTO_KEY = String(process.env.CRYPTO_KEY);
const CRYPTO_IV = String(process.env.CRYPTO_IV);
const CRYPTO_IV_STRING = String(process.env.CRYPTO_IV_STRING);

// ---------------------------- JSONWEBTOKEN --------------------
const SERVER_ACCESS_TOKEN_EXPIRETIME = String(process.env.SERVER_ACCESS_TOKEN_EXPIRETIME) || '24h';
const SERVER_REFRESH_TOKEN_EXPIRETIME = String(process.env.SERVER_REFRESH_TOKEN_EXPIRETIME) || '90d';
const SERVER_ACCESS_TOKEN_SECRET = String(process.env.SERVER_ACCESS_TOKEN_SECRET) || 'superencryptedsecret';
const SERVER_REFRESH_TOKEN_SECRET = String(process.env.SERVER_REFRESH_TOKEN_SECRET) || 'superencryptedrefreshsecret';

// ------------------ DEVELOPMENT -------------
const DEVELOPMENT = process.env.DEVELOPMENT;


const config = {
    mongo: {
        uri: MONGO_URI
    },
    server: {
        port: SERVER_PORT,
        development: DEVELOPMENT
    },
    crypto: {
        crypto_key: CRYPTO_KEY,
        crypto_iv: CRYPTO_IV,
        crypto_iv_string: CRYPTO_IV_STRING
    },
    token: {
        access_token_expireTime: SERVER_ACCESS_TOKEN_EXPIRETIME,
        refresh_token_expireTime: SERVER_REFRESH_TOKEN_EXPIRETIME,
        accessSecret: SERVER_ACCESS_TOKEN_SECRET,
        refreshSecret: SERVER_REFRESH_TOKEN_SECRET
    }
};

export default config;
