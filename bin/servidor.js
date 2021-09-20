const http = require('http')

const app = require('../src/app')
const tratamento = require('./tratamento')

process.env.APP_URL_PORT = tratamento.normalizePort(process.env.APP_URL_PORT || '3000')

app.set('port', process.env.APP_URL_PORT)

const server = http.createServer(app);

server.listen(process.env.APP_URL_PORT, () => {
    console.log(`===> SERVIDOR ONLINE : ${process.env.APP_URL_PORT} <===`)
});

server.on('error', (error) => tratamento.onError(error, process.env.APP_URL_PORT))
server.on('listening', () => tratamento.onListening(server))