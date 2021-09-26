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
    access_level: {
        type: Number,
        default : 0  
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
<<<<<<< HEAD
=======

UsuarioSchema.set({ 'autoIndex': false })

>>>>>>> main
module.exports = mongoose.model("Usuario", UsuarioSchema)