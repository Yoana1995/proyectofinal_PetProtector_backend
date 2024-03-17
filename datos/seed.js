//introducir masivamente los datos a la bd o eliminarlos
import dotenv from 'dotenv'
import { db } from '../config/db.js'

import { servicios } from '../datos/beautyServices.js'
import Servicios from '../models/pets.js'
import colors from 'colors'

dotenv.config()
await db()

async function seedDB() {
    try {
        await Servicios.insertMany(servicios)
        console.log(colors.green.bold('Se agregaron los datos correctamente'))
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

async function clearDB() {
    try {
        await Servicios.deleteMany()
        console.log(colors.red.bold('Se eliminaron los datos'))
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === '--import') {
    seedDB()
} else {
    clearDB()
}