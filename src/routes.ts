import express, {Request, Response} from 'express'

const routes = express.Router()

routes.get('/', (req: Request, res: Response)=>{
    res.json({
        "Nome do projeto":"Upload de imagens",
        "Status": "Não sei se vai dar certo"
    })
})

export default routes