require('dotenv').config()

const mongoose = require('mongoose')

let URL_APP = `${process.env.APP_URL_DOMAIN}:${process.env.APP_URL_PORT}`

const DocumentoSchema = new mongoose.Schema({
    title: String,
    description: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    name: String,
    key: String,
    size: Number,
    url: String,
    creatAt: {
        type: Date,
        default : Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
})

DocumentoSchema.pre('save', function (){
    if (!this.url) {
        this.url = `${URL_APP}/files/${this.key}`
    }
})


module.exports = mongoose.model("Documento", DocumentoSchema)