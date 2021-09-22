module.exports = (req, res) => {
    try {
        // verifica todos os campos
        // inseri o comentario 
        // se inserio retorna true
        // se não inserio, retorna false
        res.status(200).send("comment create")
    } catch (e) {
        res.status(500).send(`Erro : ${e.message}`)        
    }
}