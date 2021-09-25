const { Documento } = require("../../models")
const {value} = require('../../functions')
const fs = require('fs')
const path = require("path")

module.exports = async (req, res) => {
    try {
       
        let doc = await Documento.findOneAndDelete({ _id: req.params.id, postedBy: req.headers['user']._id })
        if (value.isNull(doc)) {
           throw new Error(`Documento não encontrado`)
        }
        fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', doc.key))
       
   
        res.status(200).send(`Documento ${req.params.id} deletado`)
    } catch (erro) {
        res.status(500).send(`Erro : ${erro.message}`)
    }
}