require('dotenv').config()
const mongoose = require('mongoose')


const MarcadorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
        index : true
    }
})

MarcadorSchema.set({ 'autoIndex': false })

module.exports = mongoose.model("Marcador", MarcadorSchema)