const http = require('http')

const app = require('../src/app')
const tratamento = require('./tratamento')

process.env.PORT = tratamento.normalizePort(process.env.PORT || "8080");
app.set('port', process.env.PORT)

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`===> SERVIDOR ONLINE : ${process.env.PORT} <===`)
});

server.on('error', (error) => tratamento.onError(error, process.env.PORT))
server.on('listening', () => tratamento.onListening(server))