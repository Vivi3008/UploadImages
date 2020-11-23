
import express, {Request, Response} from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import Post from './models/Post'

interface MulterRequest extends Request{
    file: any
}

const routes = express.Router()

routes.post('/posts', multer(multerConfig).single('file'), 
        async (req: MulterRequest, res: Response) => {
            const { originalname : name, size, key, location: url='' } = req.file

            const post = await Post.create<File>({
                name,
                size,
                key,
                url,
            })

            return res.json(post)
})

routes.get('/posts', async (req:Request, res: Response) => {
    const posts = await Post.find()
    res.json(posts)
})

routes.delete('/posts/:id', async (req: Request, res: Response)=>{
    const post = await Post.findById(req.params.id)

    await post?.remove()

    return res.send('Deletado com sucesso!')

})

export default routes