const { Usuario } = require("../../models");
const { sendError } = require("../../functions");

module.exports = async (req, res) => {
    Usuario.find()
        .then((list) => {
            list.forEach((element) => {
                list[list.indexOf(element)]["password"] = null;
            });
            res.status(200).json(list);
        })
        .catch((e) => {
            sendError(res, e);
        });
};
