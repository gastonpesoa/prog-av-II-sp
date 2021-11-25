const mongoose = require('mongoose')
const { model, Schema } = mongoose

const mascotaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true,
        min: 1,
        max: 66
    },
    tipo: String,
    vacunado: Boolean,
    observaciones: String
})

mascotaSchema.set('toJSON', {
    transform: ((document, mascotaToJSON) => {
        mascotaToJSON.id = mascotaToJSON._id.toString()
        delete mascotaToJSON._id
        delete mascotaToJSON.__v
    })
})

const Mascota = model('Mascota', mascotaSchema)

module.exports = Mascota