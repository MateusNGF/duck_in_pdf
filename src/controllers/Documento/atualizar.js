const { toCompare, value } = require("../../functions")
const { Documento } = require("../../models")

module.exports = async (req, res) => {
    try {
        toCompare.keys(['title', 'description'], req.body)
        value.paramsNull(req.body)
        
        value.checkSize(req.body.title, "titulo", 20, 100)
        value.checkSize(req.body.description, "descrição", 50, 200)

        value.hasCharSpacial(req.body.title)
        value.hasCharSpacial(req.body.description)

        if (value.isNull(await Documento.findOne({ _id: req.params.id, postedBy: req.headers['user']._id }))) {
            throw new Error(`Postagem original não encontrada`)
        } else {
            Documento.findByIdAndUpdate(req.params.id, req.body).then(s => {
                if (value.isNull(s)) throw new Error("Não foi possivel atualizar")
                res.status(200).send(true)
            })
        }
    } catch (erro) {
        if (erro.path == "_id") {
            res.status(500).send(`Erro : ID da postagem é invalido.`)
        }
        res.status(500).send(`Erro : ${erro.message}`)
    }
}