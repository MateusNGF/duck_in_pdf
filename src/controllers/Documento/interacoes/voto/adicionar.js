const { Documento } = require('../../../../models')
const { value, toCompare, sendError } = require('../../../../functions')

module.exports = (req, res, next) => {
    Documento.findById(req.body.document).then(doc => {
        if (value.isNull(doc)) { throw { message: "Documento não encontrado" } }

        if (doc.votes.findIndex(e => e == req.headers['user']._id) < 0) {
            doc.votes.push(req.headers['user']._id)
        } else {
            doc.votes = doc.votes.filter(function(item) {
                if (!(item == req.headers['user']._id)) {
                    return item
                }
            })
        }
        
        doc.save(function (e) {
            if (e) throw { dev : true, message: e.message }
            return res.json({ status: true })
        })
    }).catch(erro => {
        sendError(res, erro)
    })
}