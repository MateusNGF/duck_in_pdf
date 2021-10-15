const debug = require('debug')('nodestr:server')

exports.normalizePort = (val) => {
    var setting_port = parseInt(val, 10);

    if (isNaN(setting_port)) { return val; }
    if (setting_port >= 0) { return setting_port; }

    return false;
}

exports.onError = (error, port) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

exports.onListening = (server) => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'Pipe ' + addr
        : 'Port ' + addr.port;
    debug('Listening on ' + bind);
}