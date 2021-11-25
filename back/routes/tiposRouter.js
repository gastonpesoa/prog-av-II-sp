const tiposRouter = require('express').Router()
const Tipo = require("../models/Tipo");

tiposRouter.get('/', (req, res, next) => {
    Tipo.find({})
        .then(tipo => {
            res.json({ success: true, data: tipo }).status(200).end()
        })
        .catch(err => {
            next(err)
        })
})
tiposRouter.post('/', (req, res, next) => {
    const { descripcion } = req.body
    const nuevoTipo = new Tipo({ descripcion })
    nuevoTipo.save()
        .then(doc => {
            res.json({ success: true, data: doc }).status(200).end()
        })
        .catch(err => {
            next(err)
        })
})
module.exports = tiposRouter