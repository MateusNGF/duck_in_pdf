module.exports = (req, res) => {
    try {
        // verifica se o usuario já deixou seu voto nesse arquivo
        // se votou, retira o _id da lista de votos e retorna true
        // se não votou, retorna true
        res.status(200).send("reputation remove")
    } catch (e) {
        res.status(500).send(`Erro : ${e.message}`)
    }
}