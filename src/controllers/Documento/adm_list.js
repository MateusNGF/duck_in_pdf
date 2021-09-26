const {Documento} = require('../../models')
module.exports = async (req, res) => {
    res.status(200).json(await Documento.find())
}