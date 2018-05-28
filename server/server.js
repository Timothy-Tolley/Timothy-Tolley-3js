const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const server = express()

server.use(compression())
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
