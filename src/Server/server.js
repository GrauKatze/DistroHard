const express = require('express')
const cors = require('cors')
const path = require('path')

const router = express.Router()
const app = express()

const viewsDirPath = path.join(__dirname, '../Client/www/views')
const indexDirPath = path.join(__dirname, '../Client/www/')

const PORT = 3000
app.use(express.static(viewsDirPath, { extensions: ['html'] }))
app.use(
  '/css',
  express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css'))
)
app.use(
  '/js',
  express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js'))
)
app.use(
  '/jquery',
  express.static(path.join(__dirname, '../../node_modules/jquery/dist'))
)

app.get('/', function (req, res) {
  res.sendFile(indexDirPath + '/index.html')
})

app.use(function (req, res) {
  res.status(404).sendFile(viewsDirPath + '/404.html')
})

// app.listen(PORT, () => console.log(`My port is ${PORT}`))

module.exports = {
  app,
  PORT,
}
