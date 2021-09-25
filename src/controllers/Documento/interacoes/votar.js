module.exports = (req, res, next) => {
    try {
        switch (req.method) {
            case 'POST':
                res.send("Votar")
                break;
            case 'PUT':
                res.send("Desvotar")
                break;
            default:
                throw ({
                    code: 401,
                    message: "Unauthorized"
                })
        }
    } catch (erro) {
        res.status(erro.code ? erro.code : 500).send(`Erro : ${erro.message}`)
    }
}