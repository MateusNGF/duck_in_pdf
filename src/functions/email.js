const value = require("./value")

module.exports = {

    /**
     * Verifica o formato do Email 
     * @param {String} email 
     * @returns 
     */
    isEmail : (email) =>  {
        var expreg = /^([a-zA_Z0-9\.-]+)@([a-z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/gi
        if (value.isNull(email)) {
            throw { message : "É necessario informar o E-mail"  }
        } else if (!expreg.test(email)) {
            throw { message : "Formato de e-mail invalido"  }
        } else {
            return true
        }
    }
}