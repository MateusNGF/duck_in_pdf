require('dotenv').config()
const mongoose = require('mongoose')

let URL_APP = `${process.env.APP_URL_DOMAIN}:${process.env.APP_URL_PORT}`

const DocumentoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    name: String,
    key: {
        type: String,
        unique : true
    },
    size: Number,
    url: String,
    tags : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marcador',
        index : true
    }],
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    comments: [{
            content: {
                type: String,
                required: true
            },
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario',
                required : true
            },
            creatAt: {
                type: Date,
                default: Date.now()
            },
            updateAt: {
                type: Date,
                default: Date.now()
            },
        }],
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

DocumentoSchema.set({ 'autoIndex': false })

module.exports = mongoose.model("Documento", DocumentoSchema)