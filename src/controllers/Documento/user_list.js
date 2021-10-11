const { sendError } = require("../../functions");
const { Documento } = require("../../models");

module.exports = (req, res) => {
    Documento.aggregate([
        { $match: { "postedBy._id": req.headers["user"]._id } },
    ]).then((result) => {
        res.status(200).json(result);
    }).catch(erro => {
        sendError(res, erro);
    })
};
