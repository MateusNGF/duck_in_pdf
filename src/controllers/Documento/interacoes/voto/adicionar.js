const { Documento } = require('../../../../models')
const { value, toCompare } = require('../../../../functions')
const { exists } = require('../../../../models/documento')

module.exports = (req, res, next) => {
    Documento.findById(req.body.document).then(doc => {
        if (value.isNull(doc)) { throw { message: "Documento não encontrado" } }
        doc.votes.find(element => {
            if (element == req.headers['user']._id) {
                doc.votes.splice(doc.votes.indexOf(req.headers['user']._id))
            } else {
                doc.votes.push(req.headers['user']._id)
            }
        })
        doc.save(function (e) {
            if (e) throw { message: e.message }
            return res.json({ status: true })
        })
    }).catch(erro => {
        if (erro.kind == "ObjectId") {
            res.status(erro.code ? erro.code : 200).json({
                status: false,
                message: "ID do documento Inválido"
            })
        } else {
            res.status(erro.code ? erro.code : 200).json({
                status: false,
                message: erro.message ? erro.message : "Erro desconhecido"
            })
        }
    })
}