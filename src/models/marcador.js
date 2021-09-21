require('dotenv').config()
const mongoose = require('mongoose')


const MarcadorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
        index : true
    },
    creatBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creatAt: {
        type: Date,
        default: Date.now()
    }
})

MarcadorSchema.set({ 'autoIndex': false })

module.exports = mongoose.model("Marcador", MarcadorSchema)