const { value, toCompare } = require('../../functions')

const { Documento } = require('../../models')

module.exports = async (req, res) => {
    try {
        toCompare.keys(["title", "description"], req.body)
        value.paramsNull(req.body)

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
            size : req.file.size,
        })
        res.send(upload._id)

    } catch (erro) {
        res.status(501).send(`Erro : ${erro.message}`)
    }
}