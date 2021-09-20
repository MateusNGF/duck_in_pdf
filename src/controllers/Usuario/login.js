const { toCompare, value, jwt } = require("../../functions")
const { Usuario } = require("../../models")

module.exports = async (req, res) => {
    try {
        toCompare.keys(["email", "password"], req.body)
        value.paramsNull(req.body)
        
        var user = await Usuario.findOne({ email: req.body.email })

        if (value.isNull(user)) {
            throw new Error(`Usuario ${req.body.email} não encontrado`)
        } else {
            if (user.password !== req.body.password) {
                throw new Error(`Senha invalida`)
            } else {
                res.status(200).send(jwt.create({
                    _id : user._id,
                    email: user.email,
                    name: user.name
                },  "3h"))
            }
        }
    } catch (erro) {
        res.status(500).send(`Erro : ${erro.message}`)
    }
}