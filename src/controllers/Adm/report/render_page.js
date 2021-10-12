const { sendError, value, toCompare } = require("../../../functions");

module.exports = (req, res) => {
    try {
        /**
         * Faz uma dupla rota em uma.
         * Verifica se esta sendo passado um body.
         * Se não passar, ele renderiza o formulario.
         * Mas se passar, ele inseri os dados.
         *
         */
        if (value.isNull(req.body)) {
            res.sendFile("./views/report.html", {
                root: __dirname,
            });
        } else {
            toCompare.keys(
                ["email", "github", "name", "dange", "description"],
                req.body
            );
            value.paramsNull(req.body);
        }
    } catch (erro) {
        sendError(res, erro);
    }
};
