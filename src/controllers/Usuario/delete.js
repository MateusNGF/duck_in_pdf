const { value } = require("../../functions")
const { Usuario } = require("../../models")

module.exports = async (req, res) => {
    try {
        var deleted = await Usuario.findByIdAndDelete({ _id: req.headers['user']._id })
        console.log(deleted)
        if (value.isNull(deleted)) {
            throw new Error(`Usuario não encontrado`)
        } else {
            res.status(200).send(`Usuario ${deleted.name} deletado`)
        } 
    } catch (erro) {
        res.status(500).send(`Erro : ${erro.message}`)
    }
}