const { value , toCompare, sendError} = require("../../functions")
const { Usuario } = require("../../models")

module.exports = async (req, res) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(['name', 'password'], req.body)

        value.hasCharSpacial(req.body.name)
        value.checkSize(req.body.name, "name", process.env.NAME_MIN_SIZE, process.env.NAME_MAX_SIZE)

        if (value.isNull(await Usuario.findByIdAndUpdate({"_id" : req.headers['user']._id}, req.body))) {
            throw { message : "Não foi possivel atualziar."}
        } else {
            res.status(200).json({ status : true})
        }
    } catch (erro) {
       sendError(res, erro)
    }
}