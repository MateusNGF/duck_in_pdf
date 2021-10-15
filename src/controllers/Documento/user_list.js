const { sendError } = require("../../functions");
const { Documento } = require("../../models");

module.exports = (req, res) => {
    Documento.find({ "postedBy._id": req.headers["user"]._id }).then(s => {
        res.status(200).json(s)
    }).catch(e => {
        sendError(req, e)
    })
};
