const mongoose = require('mongoose')

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
        this.url = `${process.env.URL_APP}/files/${this.key}`
    }
})


module.exports = mongoose.model("Documento", DocumentoSchema)