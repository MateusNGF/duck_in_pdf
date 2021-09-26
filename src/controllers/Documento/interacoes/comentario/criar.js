require('dotenv').config()
const { value, toCompare, sendError } = require('../../../../functions')
const { Documento} = require('../../../../models')

module.exports = async (req, res, next) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(['_idDocument', 'content'], req.body)
        value.hasCharSpacial(req.body.content)
        value.checkSize(req.body.content, "Comentario", process.env.COMMENT_MIN_SIZE, process.env.COMMENT_MAX_SIZE)

        var doc = await Documento.findById(req.body._idDocument)

        if (value.isNull(doc)) throw { message: "Documento não existe." }
       
        doc.comments.push({
            content: req.body.content,
            postedBy: req.headers['user']._id
        })

        doc.save(function (e) {
            if (e) throw { dev : true, message: e.message }
            return res.json({ status: true })
        })

    } catch (erro) {
        sendError(res, erro)
    }
}