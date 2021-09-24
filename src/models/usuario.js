const mongoose = require('mongoose')


const UsuarioSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    creatAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
})


module.exports = mongoose.model("Usuario", UsuarioSchema)