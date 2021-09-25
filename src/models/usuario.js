const mongoose = require('mongoose')


const UsuarioSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique : true,
        index : true
    },
    password: String,
    checkEmail: {
        type: Boolean,
        default : false
    },
    creatAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
})

UsuarioSchema.set({ 'autoIndex': false })

module.exports = mongoose.model("Usuario", UsuarioSchema)