
module.exports = {
    "delete" : require("./deletar"),
    "upload" : require("./enviar"),
    "update" : require("./atualizar"),
    "user_list" : require("./user_list"),
    "adm_list": require("./adm_list"),
    "related" : require('./querys/findByTag')
}