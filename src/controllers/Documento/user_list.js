const { sendError } = require("../../functions");
const { Documento } = require("../../models");

module.exports = (req, res) => {
    let query = {
        'postedBy._id':  req.headers["user"]._id,
    };

    Documento.find(query)
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((e) => {
            sendError(res, e);
        });
};
