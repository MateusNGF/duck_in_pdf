const value = require("./value")

module.exports = {
    isEmail : (email = '') =>  {
        var expreg = /^([a-zA_Z0-9\.-]+)@([a-z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/gi
        if (value.isNull(email)) {
            throw new Error("informe um email")
        } else if (!expreg.test(email)) {
            throw new Error("formato de email invalido")
        } else {
            return true
        }
    }
}