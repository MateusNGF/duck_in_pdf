require("dotenv").config();
const sendError = require("./sendError");
const jwt = require("jsonwebtoken");

/**
 *  Faz a verificação da existencia do parametro
 * @param {*} headerV informar o campo do token
 * @return { Error } se não tiver retornar um throw
 */

/**
 * Valida se esta recebendo o token no Authorization ou no Header.
 * @param {*} req Corpo da requisição Express
 * @returns Token ou Throw
 */
function getToken(req) {
    if (req.headers["x-access-token"]) {
        return req.headers["x-access-token"];
    } else if (req.headers["authorization"]) {
        return req.headers["authorization"].toString().replace("Bearer ", "");
    } else {
        throw {
            code: 401,
            message: "No access key",
        };
    }
}

/**
 *  Decodifica e valida o token web para iniciar a sessão
 * @param {*} req req do express
 * @param {*} res res do express
 * @param {*} next next do express
 * @returns retorna os dados do token
 */
exports.verify = (req, res, next) => {
    try {
        req.headers["user"] = this.decoded(getToken(req));
        next();
    } catch (e) {
        sendError(res, e);
    }
};
exports.verifyAdm = (req, res, next) => {
    try {
        let currentUser = this.decoded(getToken(req));
        // verifica se o nivel de acesso é administrador
        if (currentUser.access_level != 1)
            throw {
                code: 401,
                message: "Acesso negado (ADM).",
            };

        req.headers["user"] = currentUser;
        next();
    } catch (e) {
        sendError(res, e);
    }
};

/**
 * Cria um Token assinado pela API
 * @param { Array } params recebe todos os dados para ir dentro do token
 * @param { Number } time recebe o tempo de vida do token
 * @param { String } secret recebe a assinatura da API
 * @return { String } retorna o token gerado
 * @author Mateus Nicolau
 */
exports.create = (paramns, time, secret = process.env.JWT_SECRET) => {
    return jwt.sign(paramns, secret, {
        expiresIn: time,
    });
};

/**
 * Decodifica o token e retorna os dados
 * @param { String } token token de acesso informado pela requisição
 * @return { Object } Retorna os dados do usuario.
 * @author Mateus Nicolau
 */
exports.decoded = (token) => {
    let s = null;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw {
                status: false,
                code: 401,
                message: "Chave de acesso invalida.",
            };
        }
        s = decoded;
    });
    return s;
};
