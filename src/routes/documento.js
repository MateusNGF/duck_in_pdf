const rotas = require("express").Router();
const multer = require("multer");

const { jwt } = require("../functions");
const { multerConfig } = require("../configs");

const controllAdm = require("../controllers/Adm");
const controllDoc = require("../controllers/Documento");
const controllInt = require("../controllers/Documento/interacoes");

/**
 * Rotas para gerenciamento dos documentos.
 * Todas precisam de um usuario logando.
 * 
 */
rotas.post(
    "/",
    jwt.verify,
    multer(multerConfig).single("document"),
    controllDoc.upload
);
rotas.get("/", jwt.verify, controllDoc.user_list);
rotas.delete("/:id", jwt.verify, controllDoc.delete);
rotas.put("/:id", jwt.verify, controllDoc.update);

/**
 * Rotas abaixo são caminhos para manipulação da interações.
 * Elas precisam de um usuario longado para que funcione.
 *
 */
rotas.post("/int/comment*", jwt.verify, controllInt.comentario.criar);
rotas.delete("/int/comment*", jwt.verify, controllInt.comentario.deletar);
rotas.put("/int/comment*", jwt.verify, controllInt.comentario.atualizar);
rotas.post("/int/vote*", jwt.verify, controllInt.voto.adicionar);

/**
 * Rotas expecificas para Aministração ou requisição interna da aplicação
 * Como eles são filhos do /Document/, são rotas relacionada a documentos.
 *  
 */
rotas.get("/api", controllAdm.DocListAll);
rotas.get("/api/related", controllAdm.Query.findByTag);
rotas.get("/api/tags", controllAdm.Query.tagsList);
rotas.get("/api/search", controllAdm.Query.searchByText)

module.exports = rotas;
