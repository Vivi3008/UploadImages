import express, {Request, Response} from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

const routes = express.Router()

routes.post('/posts', multer(multerConfig).single('file'), (req: Request, res: Response)=>{
    console.log(req.file)

    return res.json({ hello: "Acho que vai dar certo!"})
})

export default routes