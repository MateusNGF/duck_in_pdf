module.exports = (req, res) => {
    try {
        // verifica todos os campos
        // verifica se o post existe
        // faz a atualização
        // se atualizar, retorna true
        // se não, retorna false
        res.status(200).send("comment update")
    } catch (e) {
        res.status(500).send(`Erro : ${e.message}`)
    }
}