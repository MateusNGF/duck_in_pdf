const http = require('http')

const app = require('../src/app')
const tratamento = require('./tratamento')

const port = tratamento.normalizePort(process.env.PORT || '3000')

app.set('port', port)

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`===> SERVIDOR ONLINE : ${port} <===`)
});

server.on('error', (error) => tratamento.onError(error, port))
server.on('listening', () => tratamento.onListening(server))