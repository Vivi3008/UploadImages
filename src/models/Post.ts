import mongoose, { Schema, Document } from 'mongoose'

export interface File extends Document {
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: Date,
}

const PostSchema: Schema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


export default mongoose.model<File>("Post", PostSchema)
// mongoose.model("Post", PostSchema) 