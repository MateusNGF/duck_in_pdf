const { value, toCompare } = require('../../../../functions')
const { Documento} = require('../../../../models')

module.exports = async (req, res, next) => {
    try {
        toCompare.keys(['_idPost', 'content'], req.body)
        value.paramsNull(req.body)
        value.hasCharSpacial(req.body.content)

        let doc = Documento.findOne({"_id" : req.body._idPost})
    } catch (erro) {
        res.status(erro.code ? erro.code : 200).send({
            status: false,
            message: erro.message ? erro.message : "Erro desconhecido"
        })
    }
}