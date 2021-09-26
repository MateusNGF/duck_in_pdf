require('dotenv').config()

const { toCompare, value, sendError } = require("../../functions")
const { Documento } = require("../../models")

module.exports = async (req, res) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(['title', 'description'], req.body)

        value.checkSize(req.body.title, "titulo", process.env.TITLE_MIN_SIZE, process.env.TITLE_MAX_SIZE)
        value.checkSize(req.body.description, "descrição", process.env.DESC_MIN_SIZE, process.env.DESC_MAX_SIZE)

        value.hasCharSpacial(req.body.title)
        value.hasCharSpacial(req.body.description)

        if (value.isNull(await Documento.findByIdAndUpdate({
            _id: req.params.id,
            postedBy: req.headers['user']._id
        }, req.body))) {
            throw { message: "Nenhum documento encontrado" }
        } else {
            res.status(200).json({ status: true })
        }

    } catch (erro) {
        sendError(res, erro)
    }
}