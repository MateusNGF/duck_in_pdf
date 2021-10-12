require('dotenv').config()

const express       = require('express')
const mongoose      = require('mongoose')
const path          = require('path')
const morgan        = require('morgan')
const app = express()

const rotas = require('./routes')
const controllerADM = require('./controllers/Adm')

mongoose.connect(
    process.env.URL_DB
        .replace("<user>", process.env.DB_USER)
        .replace("<password>", process.env.DB_PASS)
        .replace("<database>", process.env.DB_COLLETIONS),
    {
        useNewUrlParser: true
    }
)

/**
 *  Define a acessibilidade da aplição.
 *  %%%%%%%% ATENÇÃO %%%%%%%%
 *  %                       %
 *  % Acesso : Any          %
 *  %                       %
 *  %%%%%%%%%%%%%%%%%%%%%%%%%
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 *  Define uma rota statica para visualização dos PDF diretamente.
 */
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

/**
 * Usa o framework morgan como ferramenta de log das rotas.
 */
app.use(morgan("dev"))

/**
 *  O codigo abaixo define as rotas para manipulação no Documentos e Usuarios
 *  
 */
app.use('/document', rotas.documento)
app.use('/user', rotas.usuario)

/**
 * A rotas setadas abaixo são especiais.
 * Rotas relacionadas com Administação e Segurança
 * 
 */
app.get("/api/report/dev*", controllerADM.Report.Dev);

module.exports = app;


