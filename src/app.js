require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')
const app = express()

const rotas = require('./routes')

mongoose.connect(
    process.env.URL_DB
        .replace("<user>", process.env.DB_USER)
        .replace("<password>", process.env.DB_PASS)
        .replace("<database>", process.env.DB_COLLETIONS),
    {
        useNewUrlParser : true
    }
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(morgan("dev"))

app.use('/documento', rotas.documento)
app.use('/usuario', rotas.usuario)

module.exports = app;


