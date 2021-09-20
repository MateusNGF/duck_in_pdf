require('dotenv').config()
const jwt = require('jsonwebtoken')


/**
 *  Decodifica e valida o token web para iniciar a sessão
 * @param {*} req req do express
 * @param {*} res res do express
 * @param {*} next next do express
 * @returns retorna os dados do token
 */
exports.verify = (req, res, next) => {

    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({
            message: 'Token não informado.',
            type: "TOKEN_REQUIRED"
        });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(500).send({
                message: 'Token inválido.',
                type: "INVALID_TOKEN"
            });

        // se tudo estiver ok, salva no request para uso posterior
        req.headers['user'] = decoded;
        next()
    })
}

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
        expiresIn: time
    })
}