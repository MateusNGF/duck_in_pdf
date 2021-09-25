const rotas = require('express').Router();
const multer = require('multer')

const { multerConfig } = require('../configs')
const controllDoc = require('../controllers/Documento')
const controllInt = require('../controllers/documento/interacoes')


rotas.post('/', multer(multerConfig).single('arquivo'), controllDoc.upload)
rotas.get('/', controllDoc.user_list)
rotas.delete('/:id', controllDoc.delete)
rotas.put('/:id', controllDoc.update)

// Lista as postagens de todos os usuarios 
rotas.get('/adm', controllDoc.adm_list)


rotas.post('/int/comment*', controllInt.comentario.criar)
rotas.delete('/int/comment*', controllInt.comentario.deletar)
rotas.put('/int/comment*', controllInt.comentario.atualizar)

rotas.post('/int/vote*', controllInt.voto.adicionar)


module.exports = rotas
