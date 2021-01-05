import express from 'express'
import routes from './routes'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { load } from 'ts-dotenv'


dotenv.config()

const env = load({
MONGO_DB_URL: String,
})

const app = express()

//Database setup

mongoose.connect(env.MONGO_DB_URL, {useNewUrlParser: true ,  useUnifiedTopology: true} )


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
//liberar acesso a arquivos estaticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(routes)

app.listen(process.env.PORT || 3300)
