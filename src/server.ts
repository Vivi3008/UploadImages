import express from 'express'
import routes from './routes'
import morgan from 'morgan'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

//Database setup

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true} )



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(routes)

app.listen(3300)