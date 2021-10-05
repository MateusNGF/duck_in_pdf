require("dotenv").config();

const { toCompare, value, jwt, sendError, email } = require("../../functions");
const { Usuario } = require("../../models");

module.exports = async (req, res) => {
    try {
        value.paramsNull(req.body);
        toCompare.keys(["email", "password"], req.body);
        email.isEmail(req.body.email);

        var user = await Usuario.findOne({ email: req.body.email });

        if (value.isNull(user)) {
            throw { message: `Usuario ${req.body.email} não encontrado` };
        } else {
            if (user.password !== req.body.password) {
                throw { message: `Senha invalida` };
            } else {
                var bodyResponde = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    access_level: user.access_level,
                };
                res.status(200).json({
                    status: true,
                    token: jwt
                        .create(bodyResponde, process.env.JWT_TIME_EXPIRENCE)
                        .toString(),
                    info_user: bodyResponde,
                });
            }
        }
    } catch (erro) {
        sendError(res, erro);
    }
};
