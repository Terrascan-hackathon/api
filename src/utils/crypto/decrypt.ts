import config from "../../config/env.config";
import crypto from 'crypto';

const key = JSON.parse(config.crypto.crypto_key);
const ivString = config.crypto.crypto_iv_string;

const decrypt = (encryptedData: string): string => {
    let iv = Buffer.from(ivString, 'hex');
    let encryptedText = Buffer.from(encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return String(decrypted);
};

export default decrypt;
