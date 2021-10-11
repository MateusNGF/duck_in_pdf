const rotas         = require('express').Router()
const controllerUser = require('../controllers/Usuario')
const controllerAdm = require('../controllers/Adm')
const { jwt }       = require('../functions')

rotas.post('/register',             controllerUser.register)
rotas.post('/access',               controllerUser.login)
rotas.delete('/',       jwt.verify, controllerUser.delete)
rotas.put('/',          jwt.verify, controllerUser.update)



// ROTAS USADAS PELO SISTEMA
rotas.get("/api", controllerAdm.UserListAll);


module.exports = rotas

