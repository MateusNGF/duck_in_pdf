const { toCompare, value, email } = require('../../functions')
const {  Usuario } = require('../../models')

module.exports = async (req, res) => {
    try {
        toCompare.keys(["name", "email", "password"], req.body)
        value.paramsNull(req.body)

        email.isEmail(req.body.email)
        
        value.hasCharSpacial(req.body.name)
        value.checkSize(req.body.name, "nome", 15, 70)

        if (await Usuario.findOne({ email: req.body.email })) {
                throw new Error(`Email ${req.body.email} já cadastrado`)
        } else {
            Usuario.create(req.body).then(created => {
                res.status(200).send(created._id)
            }).catch(erro => {
                res.status(500).send("Erro ao cadastrar")
                console.log(erro)
            })
        }
    } catch (erro) {
        res.status(500).send(`Erro : ${erro.message}`)
    }
}