import express from 'express'
import routes from './routes'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(routes)

app.listen(3300)