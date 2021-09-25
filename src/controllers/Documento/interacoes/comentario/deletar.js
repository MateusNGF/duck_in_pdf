module.exports = async (req, res, next) => {
    try {
        res.send(req.method)
    } catch (erro) {
        res.status(erro.code ? erro.code : 200).send({
            status: false,
            message: erro.message ? erro.message : "Erro desconhecido"
        })
    }
}