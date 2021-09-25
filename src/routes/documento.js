const rotas = require('express').Router();
const multer = require('multer')

const { multerConfig } = require('../configs')
const documentoController = require('../controllers/Documento')
const interacoesController = require('../controllers/Interações/Documento')


/**
 *  ROTAS PARA MANIPULAÇÕES NO DOCUMENTO
 */

// Cria uma nova postagem
rotas.post('/', multer(multerConfig).single('arquivo'), documentoController.upload)
// Lista as postagens do Usuario atual.
rotas.get('/', documentoController.user_list)
// Deleta
rotas.delete('/:id', documentoController.delete)
// Atualiza
rotas.put('/:id', documentoController.update)


/** 
 *  ROTAS PARA INTERAÇÕES DO DOCUMENTO
 */

// Cria um novo comentario
rotas.post('/comment', interacoesController.comment.create)
// Deleta um  comentario
rotas.delete('/comment', interacoesController.comment.delete)
// Atualiza um comentario
rotas.put('/comment', interacoesController.comment.update)

// Adiconar um voto na reputação
rotas.post('/reputation', interacoesController.reputation.adicionar)
// Remove um voto na reputação
rotas.delete('/reputation', interacoesController.reputation.remover)





// Lista as postagens de todos os usuarios 
rotas.get('/adm' ,documentoController.adm_list)


module.exports = rotas
