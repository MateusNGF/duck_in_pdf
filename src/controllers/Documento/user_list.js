const { Documento } = require("../../models")

module.exports = async (req, res) => {
    try {
        res.status(200).send(await Documento.find({ postedBy : req.headers['user']._id }))
    } catch (erro) {
        res.status(500).send(`Erro : ${erro.message}`)
    }
}