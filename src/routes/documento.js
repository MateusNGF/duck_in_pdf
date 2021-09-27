const rotas =  require('express').Router();
const multer = require('multer')

const { multerConfig }  = require('../configs')
const controllDoc       = require('../controllers/Documento')
const controllInt       = require('../controllers/documento/interacoes');
const { jwt }           = require('../functions');


rotas.post('/',       jwt.verify, multer(multerConfig).single('arquivo'), controllDoc.upload)
rotas.get('/',        jwt.verify, controllDoc.user_list)
rotas.delete('/:id',  jwt.verify, controllDoc.delete)
rotas.put('/:id',     jwt.verify, controllDoc.update)

// Lista as postagens de todos os usuarios 
rotas.get('/adm', jwt.verifyAdm, controllDoc.adm_list)


rotas.post('/int/comment*',    jwt.verify, controllInt.comentario.criar)
rotas.delete('/int/comment*',  jwt.verify, controllInt.comentario.deletar)
rotas.put('/int/comment*',     jwt.verify, controllInt.comentario.atualizar)
rotas.post('/int/vote*',       jwt.verify, controllInt.voto.adicionar)


module.exports = rotas
