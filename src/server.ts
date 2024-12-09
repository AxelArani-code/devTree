import express from 'express'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'

const app  = express()

//Conectar BD 
connectDB()

//Leer datos de formulario 
app.use(express.json())

//lleva la propiedad router "Eso  va hacer que cuando visite la paguina va entrar al router y va entrar al router y busque la palabra "
app.use('/', router )

export default app