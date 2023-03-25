import { Document, Types } from "mongoose";

interface IUser extends Document {
    _id: Types.ObjectId
    email: string
    password: string
    role: string
    loggedIn: boolean
    updatedAt: Date
}

export default IUser;