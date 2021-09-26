const value = require('./Value')

/**
 * Verifica se as keys de um Objet contem os requisitos passado. 
 * @param { Array } requeriments define as keys necessaria
 * @param { Array } obj Objeto para validação
 * @return { Error } Se estiver algum erro retorna uma Exception
 * @author Mateus Nicolau
 */

exports.keys = (req = [], obj = {}, security = true) => {
    if (value.isNull(req)) { throw {dev : true,message: `É preciso informar os requisitos para validação`}}
    if (value.isNull(obj)) { throw {dev : true, message: `É preciso informar os dados para validação`} }
    
    if (security) {
        for (let param in Object.keys(req)) {
            if (!Object.keys(obj).find(element => {
                if (element.toLocaleLowerCase() == req[param].toLocaleLowerCase()) { return true }
            })) { throw { message: `É necessario informar a(o) ${req[param]}`} }
        }
        for (let param in obj) {
            if (!req.find(element => element.toLowerCase() == param.toLowerCase()))
                throw { message: `O(a) parametro "${param}" é inesperado`}
        }
        return true
    } else {
        for (let param in Object.keys(req)) {
            if (!Object.keys(obj).find(element => {
                if (element.toLocaleLowerCase() == req[param].toLocaleLowerCase()) { return true }
            })) throw { message: `É necessario informar a(o) ${req[param]}`}
        }
    }
}


