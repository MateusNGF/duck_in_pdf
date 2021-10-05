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
        res.status(200).json({
          status: true,
          token: jwt
            .create(
              {
                _id: user._id,
                email: user.email,
                access_level: user.access_level,
              },
              process.env.JWT_TIME_EXPIRENCE
            )
            .toString(),
          info_user: {
            name: user.name,
            email: user.email,
            access_level: user.access_level,
          },
        });
      }
    }
  } catch (erro) {
    sendError(res, erro);
  }
};
