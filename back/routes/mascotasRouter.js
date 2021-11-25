const mascotasRouter = require('express').Router()
const Mascota = require("../models/Mascota");
const { verifyToken } = require('../utils/middleware');

mascotasRouter.use(verifyToken)

mascotasRouter.get('/', (req, res, next) => {
    Mascota.find({})
        .then(mascotas => {
            res.json({ success: true, data: mascotas }).status(200).end()
        })
        .catch(err => {
            next(err)
        })
})
mascotasRouter.get('/:id', (req, res, next) => {
    const id = req.params.id
    Mascota.findById(id)
        .then(mascota => {
            if (mascota) {
                res.json({ success: true, data: mascota }).status(200).end()
            } else {
                res.json({ success: false, data: 'Mascota not found' }).status(404).end()
            }
        })
        .catch(err => {
            next(err)
        })
})
mascotasRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id
    Mascota.findByIdAndRemove(id)
        .then(mascota => {
            if (mascota) {
                res.json({ success: true, data: mascota }).status(204).end()
            } else {
                res.json({ success: false, data: 'Mascota not found' }).status(404).end()
            }
        })
        .catch(err => {
            next(err)
        })
})
mascotasRouter.post('/', (req, res, next) => {
    const { nombre, edad, tipo, vacunado, observaciones } = req.body
    const nuevaMascota = new Mascota({
        nombre,
        edad,
        tipo,
        vacunado,
        observaciones
    })
    nuevaMascota.save()
        .then(doc => {
            res.json({ success: true, data: doc }).status(200).end()
        })
        .catch(err => {
            next(err)
        })
})
mascotasRouter.put('/:id', (req, res, next) => {
    const id = req.params.id
    const { nombre, edad, tipo, vacunado, observaciones } = req.body
    const infoMascota = {}
    if (nombre) {
        infoMascota.nombre = nombre
    }
    if (edad) {
        infoMascota.edad = edad
    }
    if (tipo) {
        infoMascota.tipo = tipo
    }
    if (observaciones) {
        infoMascota.observaciones = observaciones
    }
    if (vacunado != null && vacunado != undefined) {
        infoMascota.vacunado = vacunado
    }
    Mascota.findByIdAndUpdate(id, infoMascota, { new: true })
        .then(mascota => {
            if (mascota) {
                res.json({ success: true, data: mascota }).status(204).end()
            } else {
                res.json({ success: false, data: 'Mascota not found' }).status(404).end()
            }
        })
        .catch(err => {
            console.log(`err`, err)
            next(err)
        })
})

module.exports = mascotasRouter