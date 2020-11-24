import { Request, Response } from 'express'
import Post from '../models/Post'

interface MulterRequest extends Request{
    file: any
}

export default {
    async InsertPost (req: MulterRequest, res: Response) {
        const { originalname : name, size, key, location: url='' } = req.file

        const post = await Post.create<File>({
            name,
            size,
            key,
            url,
        })
        return res.json(post)
    },

    async ListPost(req:Request, res: Response){
        const posts = await Post.find()
        res.json(posts)
    },

    async DeletePost(req: Request, res: Response){
        const post = await Post.findById(req.params.id)
    
        await post?.remove()
    
        return res.send('Deletado com sucesso!')
    }
}