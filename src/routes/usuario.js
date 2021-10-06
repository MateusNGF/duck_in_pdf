const rotas         = require('express').Router()
const controllers   = require('../controllers/Usuario')
const { jwt }       = require('../functions')

rotas.post('/register',             controllers.register)
rotas.post('/access',               controllers.login)
rotas.delete('/',       jwt.verify, controllers.delete)
rotas.put('/',          jwt.verify, controllers.update)



// ROTAS USADAS PELO SISTEMA
rotas.get('/api', controllers.adm_list)


module.exports = rotas

