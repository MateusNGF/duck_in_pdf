const { sendError, value, toCompare } = require("../../../functions");
const { Documento } = require("../../../models");

module.exports = (req, res) => {
    try {
        toCompare.keys(["tags"], req.body);
        // value.paramsNull(req.body);
        
    } catch (e) {
        sendError(res, e);
    }
};
