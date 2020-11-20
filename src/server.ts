import express, { urlencoded } from 'express'
import routes from './routes'
import morgan from 'morgan'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config({path:__dirname+'/.env'})


const app = express()

//Database setup

mongoose.connect("mongodb://localhost:27017/upload", {useNewUrlParser: true} )



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(routes)

app.listen(3300)