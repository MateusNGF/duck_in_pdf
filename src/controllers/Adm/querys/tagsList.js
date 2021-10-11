const { sendError } = require("../../../functions");
const { Marcador } = require("../../../models");

module.exports = async (req, res) => {
    try {

        /**
         * Faz a lsitagem de todas as Tags já cadastradas.
         * Ordena por data de criação.
         * 
         */
        res.status(200).json(await Marcador.find());
    } catch (e) {
        sendError(res, e);
    }
};
