const { value, toCompare, sendError } = require('../../functions')
const { Documento, Marcador } = require('../../models')

module.exports = async (req, res) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(["title", "description", "tags"], req.body)

        var marcadores = req.body.tags
        marcadores = marcadores.split(',')
        var tags = []

        for (let i = 0; i < marcadores.length; i++) {
            value.hasCharSpacial(marcadores[i])
            let found = await Marcador.findOne({ name: marcadores[i] })
            if (found != null) {
                tags.push({
                    _id: found._id
                })
            } else {
                var { _id } = await Marcador.create({ name: marcadores[i] })
                tags.push({ _id })
            }
        }

        value.checkSize(req.body.title, "titulo", 20, 100)
        value.checkSize(req.body.description, "descrição", 50, 200)

        value.hasCharSpacial(req.body.title)
        value.hasCharSpacial(req.body.description)

        var upload = await Documento.create({
            title: req.body.title,
            description: req.body.description,
            postedBy: req.headers['user']._id,
            name: req.file.originalname,
            key: req.file.filename,
            size: req.file.size,
            tags
        })
        res.json({
            status: true,
            _id: upload._id
        })

    } catch (erro) {
        sendError(res, erro)
    }
}