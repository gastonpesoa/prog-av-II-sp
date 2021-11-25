const mongoose = require('mongoose')
const { model, Schema } = mongoose

const tipoSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    }
})

tipoSchema.set('toJSON', {
    transform: ((document, tipoToJSON) => {
        tipoToJSON.id = tipoToJSON._id.toString()
        delete tipoToJSON._id
        delete tipoToJSON.__v
    })
})

const Tipo = model('Tipo', tipoSchema)

module.exports = Tipo