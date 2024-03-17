import Pets from '../models/pets.js'
import User from '../models/User.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

// crear mascota
const crearPets = async (req, res) => {
    // console.log('aquiiiiiii estoy')
    if(Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
               
        return res.status(400).json({
            msg: error.message
        })
   }

   try {
        const pet = new Pets(req.body)
        await pet.save()

        res.json({
            msg: 'La mascota se creo correctamente'
        })
   } catch (error) {
        console.log(error)
   }
}

// obtener todas las mascotas
const getPets = async (req, res) => {
    try {
        const pets = await Pets.find()  
        const user = await User.find()  
        res.json({pets: pets,user: user})
    } catch (error) {
        console.log(error)
    }
}

// obtener una mascota por el id
const getPetsId = async (req, res) => {
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id, res)) return

    // Validar que exista
    const pet = await Pets.findById(id) // te permite buscar el id
    if(!pet) {
        return handleNotFoundError('La mascota no existe', res)
    }
    // Mostrar el servicio
    res.json(pet)
}

// optiene las mascotas segun si estan en adopcion o acogida
const getPetsOpcion = async (req, res) => {
    const { opcion } = req.params
    // console.log(opcion)
    try {
        const pets =await Pets.find({especie : opcion})
        res.json(pets)
    } catch (error) {
        console.log(error)
    }
}

// actualizar mascota
const updatePets = async (req, res) => {
    const { id } = req.params
    // console.log("aqui estamos", id)

    // Validar un object id
    if(validateObjectId(id, res)) return

    // Validar que exista
    const pet = await Pets.findById(id)
    if(!pet) {
        return handleNotFoundError('La mascota no existe', res)
    }

    // Escribimos en el objeto los valores nuevos
    pet.nombre = req.body.nombre || pet.nombre
    pet.sexo = req.body.sexo || pet.sexo
    pet.esterilizado = req.body.esterilizado || pet.esterilizado
    pet.tamaño = req.body.tamaño || pet.tamaño
    pet.fechanacimiento = req.body.fechanacimiento || pet.fechanacimiento
    pet.chip = req.body.chip || pet.chip
    pet.especie = req.body.especie || pet.especie
    pet.adopcion = req.body.adopcion || pet.adopcion
    pet.acogida = req.body.acogida || pet.acogida
    pet.descripcion = req.body.descripcion || pet.descripcion
    pet.imagen = req.body.imagen || pet.imagen

    try {
        await pet.save()
        res.json({
            msg: 'La mascota se actualizó correctamente'
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error al guardar los datos'
        })
    }
}

// eliminar una mascota
const deletePets = async (req, res) => {
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id, res)) return

    // Validar que exista
    const pet = await Pets.findById(id)
    if(!pet) {
        return handleNotFoundError('La mascota no existe', res)
    }

    try {
        await pet.deleteOne()
        res.json({
            msg: 'La mascota se eliminó correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

export{
    getPets,
    crearPets,
    getPetsId,
    updatePets,
    deletePets,
    getPetsOpcion
}