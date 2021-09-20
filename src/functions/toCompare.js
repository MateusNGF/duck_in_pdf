const value = require('./Value')

/**
 * Verifica se as keys de um Objet contem os requisitos passado. 
 * @param { Array } requeriments define as keys necessaria
 * @param { Array } obj Objeto para validação
 * @return { Error } Se estiver algum erro retorna uma Exception
 * @author Mateus Nicolau
 */

exports.keys = (req = [], obj = {}, security = true) => {
    if (value.isNull(req)) { throw new Error(`É preciso informar os requisitos para validação`) }
    if (value.isNull(obj)) { throw new Error(`É preciso informar os dados para validação`) }
    
    if (security) {
        for (let param in Object.keys(req)) {
            if (!Object.keys(obj).find(element => {
                if (element.toLocaleLowerCase() == req[param].toLocaleLowerCase()) { return true }
            })) { throw new Error(`O parametro ${req[param]} é necessario`) }
        }
        for (let param in obj) {
            if (!req.find(element => element.toLowerCase() == param.toLowerCase()))
              throw new Error(`O parametro "${param}" é inesperado`)
        }
        return true
    } else {
        for (let param in Object.keys(req)) {
            if (!Object.keys(obj).find(element => {
                if (element.toLocaleLowerCase() == req[param].toLocaleLowerCase()) { return true }
            })) { throw new Error(`O parametro ${req[param]} é necessario`) }
        }
    }
}


