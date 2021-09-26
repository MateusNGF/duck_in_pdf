const {sendError, toCompare, value} = require('../../../../functions')
const {Documento} = require('../../../../models')
module.exports = async (req, res, next) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(['_idDocument', '_idComment', 'content'], req.body)

        let doc = await Documento.findById(req.body._idDocument)
        if (value.isNull(doc)) throw { message: "Documento não existe. " }

        let ps = doc.comments.indexOf(doc.comments.find(e =>
            (e._id == req.body._idComment && e.postedBy == req.headers['user']._id)
        ))

        if (ps < 0) throw { message: "Comentario não encontrado ou não autorizado para edição" }
        
        doc.comments[ps].content = req.body.content
        doc.comments[ps].updateAt = Date.now()

        doc.save(function (e) {
            if (e) throw { dev: true, message: e.message }
            return res.json({ status: true })
        })

    } catch (erro) {
        sendError(res, erro)
    }
}