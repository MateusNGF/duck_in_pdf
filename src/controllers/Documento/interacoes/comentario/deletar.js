const { sendError, value, toCompare } = require("../../../../functions")
const { Documento } = require("../../../../models")

module.exports = async (req, res, next) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(['_idDocument', '_idComment'], req.body)

        let doc = await Documento.findById(req.body._idDocument)
        if (value.isNull(doc)) throw { message: "Documento não encontrado. " }

        if (value.isNull(
            doc.comments.find(e =>
                (e.postedBy == req.headers['user']._id && e._id == req.body._idComment)
            )
        )){ throw { message : "Comentario não encontrado ou ação não autorizada"}}

        doc.comments = doc.comments.filter(function (item) {
            if (!(item._id == req.body._idComment && item.postedBy == req.headers['user']._id)) {
                return item
            }
        })

        doc.save(function (e) {
            if (e) throw { dev: true, message: e.message }
            return res.json({ status: true })
        })

    } catch (erro) {
        sendError(res, erro)
    }
}