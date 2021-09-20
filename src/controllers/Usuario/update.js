const { value , toCompare} = require("../../functions")
const { Usuario } = require("../../models")

module.exports = async (req, res) => {
    try {
        toCompare.keys(['name', 'password'], req.body)
        value.paramsNull(req.body)

        value.hasCharSpacial(req.body.name)
        value.checkSize(req.body.name, "nome", 15, 70)

        Usuario.findByIdAndUpdate(req.headers['user']._id, req.body).then(s => {
            if (value.isNull(s)) {
                throw new Error(`Erro ao atualizar o usuario`)
            }
            res.status(200).send(true)
        })
    } catch (erro) {
        res.status(500).send(`Erro : ${erro.message}`)
    }
}