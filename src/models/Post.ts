import mongoose, { Schema, Document } from 'mongoose'
import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const s3 = new aws.S3()

export interface File extends Document {
    name: String,
    size: Number,
    key: string,
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

PostSchema.pre<File>('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})



PostSchema.pre<File>('remove', function(){
   
    let params = { Bucket: 'uploadexample2', Key: `${this.key}`}

    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject(params, function(err, data){
            if(err) console.log("Erro ao deletar objeto", err)
            console.log(data)
        }).promise()
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..','..','tmp','uploads', this.key)
        )
    }
})

export default mongoose.model<File>("Post", PostSchema)
// mongoose.model("Post", PostSchema) 