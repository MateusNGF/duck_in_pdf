const { value, sendError, toCompare } = require("../../functions")
const { Usuario } = require("../../models")

module.exports = async (req, res) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(['password'], req.body)

        let deleted = await Usuario.findById({ _id: req.headers['user']._id })
        if (value.isNull(deleted)) throw { message: "Não foi possivel deletar o usuario" }
        if (deleted.password != req.body.password) throw { message: "Senhas incorreta" }

        await Usuario.deleteOne({ _id: req.headers['user']._id, password: req.body.password })
        res.status(200).json({ status: true })

    } catch (e) {
        sendError(res, e)
    }
}