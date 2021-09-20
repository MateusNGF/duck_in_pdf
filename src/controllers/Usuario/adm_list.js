const {Usuario} = require('../../models')
module.exports = async (req, res) => {
    try {
        res.status(200).send(await Usuario.find())
    } catch (erro) {
        res.status(500).send(erro.message)
    }
}   