import mongoose from 'mongoose'

const petsSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }, 
    sexo: {
        type: String,
        required: true,
        trim: true
    }, 
    esterilizado: {
        type: String,
        required: true,
        trim: true
    }, 
    tamaño: {
        type: String,
        required: true,
        trim: true
    },
    fechanacimiento: {
        type: String,
        required: true,
        trim: true
    }, 
    chip: {
        type: String,
        required: true,
        trim: true
    }, 
    especie: {
        type: String,
        required: true,
        trim: true
    }, 
    adopcion: {
        type: String,
        trim: true
    },
    acogida: {
        type: String,
        trim: true
    }, 
    descripcion: {
        type: String,
        default: null,
        trim: true
    },
    imagen: {
        type: String,
        required: true
    }
})

const Pets = mongoose.model('Pets', petsSchema)
export default Pets