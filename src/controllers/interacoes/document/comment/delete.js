module.exports = (req, res) => {
    try {
        // verifica se o comentario existe
        // se existir, deleta e retorna true
        // se não, retornar false.
        res.status(200).send("comment delete")
    } catch (e) {
        res.status(500).send(`Erro : ${e.message}`)
    }
}