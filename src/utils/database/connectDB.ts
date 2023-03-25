import mongoose, { ConnectOptions } from "mongoose";
import config from "../../config/env.config";

const connectDB = () => {
    try {
        mongoose
            .connect(config.mongo.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions)
            .then(() => {
                console.log('Successfully connected to MongoDB');
            })
            .catch((err) => {
                console.error(err);
            })
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;