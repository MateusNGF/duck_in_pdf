require('dotenv').config()

const { toCompare, value, email, sendError } = require('../../functions')
const {  Usuario } = require('../../models')

module.exports = async (req, res) => {
    try {
        value.paramsNull(req.body)
        toCompare.keys(["name", "email", "password"], req.body)
        email.isEmail(req.body.email)
        value.hasCharSpacial(req.body.name)
        value.checkSize(req.body.name, "name", process.env.NAME_MIN_SIZE, process.env.NAME_MAX_SIZE)

        if (await Usuario.findOne({ email: req.body.email })) {
                throw new Error(`Email ${req.body.email} já cadastrado`)
        } else {
            let created = await Usuario.create(req.body)
            if (!value.isNull(created)) {
                res.status(200).json({
                    status: true
                })
            } else {
                throw { message: "Não foi possivel realizar o cadastro." }
            }
        }
    } catch (erro) {
        sendError(res, erro)
    }
}