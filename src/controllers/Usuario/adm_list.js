const { Usuario } = require('../../models')
const { sendError } = require('../../functions')

module.exports = async (req, res) => {

    Usuario.find().then(list => {
        res.status(200).json(list)
    }).catch(e => {
        sendError(res, e)
    })

}