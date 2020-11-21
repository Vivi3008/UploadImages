import express, {Request, Response} from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import Post from './models/Post'

const routes = express.Router()

routes.post('/posts', multer(multerConfig).single('file'), async (req: Request, res: Response)=>{
    const { originalname : name, size, key, location: url='' } = req.file

    const post = await Post.create<File>({
        name,
        size,
        key,
        url,
    })

    return res.json(post)
})

export default routes