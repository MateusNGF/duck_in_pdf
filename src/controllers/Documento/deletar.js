const { Documento } = require("../../models")
const { value, sendError } = require('../../functions')
const fs = require('fs')
const path = require("path")

module.exports = (req, res) => {

    Documento.findOneAndDelete({ _id: req.params.id, postedBy: req.headers['user']._id }).then(doc => {
        if (value.isNull(doc)) { throw { message: `Documento não encontrado` } }
        fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', doc.key))

        res.status(200).json({ status: true })
    }).catch(e => {
        sendError(res, e)
    })

}