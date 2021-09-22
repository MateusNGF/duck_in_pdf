module.exports = (req, res) => {
    try {
        // recebe o id do usuario e do post
        // insere o  voto
        res.status(200).send("Reputation add")
    } catch (e) {
        res.status(500).send(`Erro : ${e.message}`)
    }
}