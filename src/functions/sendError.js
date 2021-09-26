module.exports = (res, erro) => {

    if (erro.dev) {
        console.error("ERRO DEV : " + erro.message)
        erro.code = 500
        erro.message = "Erro Interno, consulte o administrador."
    }

    if (erro.path == "_id") {
        erro.message = `ID da postagem é invalido ou irregular.`
    }

    res.status(erro.code ? erro.code : 200).json({
        status: false,
        message: erro.message ? erro.message : "Erro desconhecido"
    })
}