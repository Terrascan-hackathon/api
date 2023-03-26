import config from '../../config/env.config';
import crypto from 'crypto';

const key = JSON.parse(config.crypto.crypto_key);
const iv = JSON.parse(config.crypto.crypto_iv);

const encrypt = (plain: string): string => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
    let encrypted = cipher.update(plain);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const encryptedHEX = encrypted.toString('hex');

    return encryptedHEX;
};

export default encrypt;
