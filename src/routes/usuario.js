const rotas = require('express').Router()

const controllers = require('../controllers/Usuario')
const { jwt } = require('../functions')

rotas.post('/', controllers.register)
rotas.get('/', controllers.login)
rotas.delete('/', jwt.verify, controllers.delete)
rotas.put('/', jwt.verify ,controllers.update)

rotas.get('/adm', controllers.adm_list)


module.exports = rotas

