import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
import { db } from './config/db.js'
import colors from 'colors'
import inicioRoutes from './routes/inicioRoutes.js'
import authRoutes from './routes/authRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar la app
const app = express()

// Leer datos via body
app.use(express.json())

// Conectar a BD
db()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL, undefined] // , undefined -> hay que quitarlo antes de hacer el deploiment

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            // Permite la conexión
            callback(null, true)
        } else {
            // No permitir la conexión
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

// Definir una ruta
app.use('/pets', inicioRoutes)
app.use('/auth', authRoutes)

// Definir puerto
const PORT = process.env.PORT || 4000

// arrancar la app
app.listen(PORT, () => {
    console.log( colors.brightMagenta( 'El servidor se esta ejecutando en el puerto:'), colors.blue.bold(PORT ))
})
