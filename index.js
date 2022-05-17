const { Sequelize, where } = require('sequelize')
const {
  syncDataBase,
  Hard,
  DistroLinux,
  Status,
  insertData,
  selectDataAll,
  deleteData,
} = require('./src/Server/dataBase')
const { app, PORT } = require('./src/Server/server')
;(async () => {
  await serverStart()
})()

async function serverStart() {
  app.listen(PORT, () => console.log(`My port is ${PORT}`))
  await syncDataBase()
}
