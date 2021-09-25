const { Documento } = require("../../../models");
const { value, toCompare} = require('../../../functions');
const { hasCharSpacial } = require("../../../functions/Value");

module.exports = (req, res, next) => {
    try {
        switch (req.method) {
            case 'POST':
                toCompare(['_idPost', 'content'], req.body)
                value.paramsNull(req.body)

                hasCharSpacial(req.body.content)
                req.body['postedBy']
                res.send(req.body)
                break;
            case 'DELETE':
                res.send(res.send(req.body))
                break;
            case 'PUT':
                res.send(res.send(req.body))
                break;
        
            default:
                throw ({
                    code: 401,
                    message : "Unauthorized"
                })
        }
       
    } catch (erro) {
        res.status(erro.code ? erro.code : 500).send(`Erro : ${erro.message}`)
    }
}