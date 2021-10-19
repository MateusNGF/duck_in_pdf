const { sendError, value } = require("../../../functions");
const { Documento } = require("../../../models");

module.exports = async (req, res) => {
    try {
        if (!req.body.text) throw { message: "Need send a text for search." };
        /**
         * Faz a lsitagem de todas as Tags já cadastradas.
         * Ordena por data de criação.
         *
         */
        res.status(200).json(
            await Documento.find(
                { $text: { $search: req.body.text } },
                { score: { $meta: "textScore" } }
            ).sort({ score: { $meta: "textScore" } })
        );
    } catch (e) {
        sendError(res, e);
    }
};
