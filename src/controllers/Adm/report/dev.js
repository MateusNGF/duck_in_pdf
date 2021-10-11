const { sendError } = require("../../../functions")


module.exports = (req, res) => {
    try {
        res.sendFile("./views/report.html", {
            root : __dirname
        })
    } catch (erro) {
        sendError(res, erro)
    }
}

