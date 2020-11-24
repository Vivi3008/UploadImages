
import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import PostController from './controller/PostController'

const routes = express.Router()

routes.post('/posts', multer(multerConfig).single('file'), PostController.InsertPost)

routes.get('/posts', PostController.ListPost)

routes.delete('/posts/:id', PostController.DeletePost)

export default routes