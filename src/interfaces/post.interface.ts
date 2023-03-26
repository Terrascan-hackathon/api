import { Document, Types } from "mongoose";

interface IPost extends Document {
    _id: Types.ObjectId
    title: string
    image: string
    severity: number
    description: string
}

export default IPost;