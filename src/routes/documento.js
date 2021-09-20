const rotas = require('express').Router();
const multer = require('multer')

const { multerConfig } = require('../configs')
const { jwt } = require('../functions')
const controllers = require('../controllers/Documento')

rotas.post('/', jwt.verify, multer(multerConfig).single('arquivo'),  controllers.upload)
rotas.get('/', jwt.verify, controllers.user_list)
rotas.delete('/:id', jwt.verify, controllers.delete)
rotas.put('/:id', jwt.verify, controllers.update)

rotas.get('/adm', controllers.adm_list)


module.exports = rotas
