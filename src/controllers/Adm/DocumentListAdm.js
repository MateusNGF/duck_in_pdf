const { sendError } = require("../../functions");
const { Documento } = require("../../models");

module.exports = (req, res) => {
    Documento.find().sort()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((e) => {
            sendError(res, e);
        });
};
