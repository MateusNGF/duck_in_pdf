const rotas = require('express').Router();
const multer = require('multer')

const { multerConfig } = require('../configs')
const { jwt } = require('../functions')
const controllers = require('../controllers/Documento')

// Cria uma nova postagem
rotas.post('/', jwt.verify, multer(multerConfig).single('arquivo'),  controllers.upload)

// Lista as postagens do Usuario atual.
rotas.get('/', jwt.verify, controllers.user_list)

// Deleta
rotas.delete('/:id', jwt.verify, controllers.delete)

// Atualiza
rotas.put('/:id', jwt.verify, controllers.update)

// Lista as postagens de todos os usuarios 
rotas.get('/adm' ,controllers.adm_list)


module.exports = rotas
