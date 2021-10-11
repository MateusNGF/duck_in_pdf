const { sendError, value, toCompare } = require("../../../functions");
const { Documento } = require("../../../models");

module.exports = async (req, res) => {
    try {

        /**
         * Retorna a lista de Documento cujo possuem relação com base nas Tags
         * Ele retornar todos os documentos que possuem TODAS as tags informadas.
         * Se uma tag nõa for encontrada ele discarta o documento da resposta.
         * 
         */
        toCompare.keys(["tags"], req.body);
        value.paramsNull(req.body);

        res.status(200).json(
            await Documento.find({ "tags.name": { $all: req.body.tags } })
        );
    } catch (e) {
        sendError(res, e);
    }
};
