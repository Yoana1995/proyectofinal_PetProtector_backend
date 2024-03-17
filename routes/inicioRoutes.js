import express from 'express'
import {crearPets, getPets, getPetsId, updatePets, deletePets, getPetsOpcion } from '../controllers/pestController.js' 

const router = express.Router()

router.route('/')
    .post(crearPets)
    .get(getPets)

router.route('/:id')
    .get(getPetsId)
    .put(updatePets)
    .delete(deletePets)

router.route('/opcion/:opcion')
    .get(getPetsOpcion)

export default router