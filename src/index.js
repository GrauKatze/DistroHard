const { syncDataBase, Hard } = require('./Server/dataBase')
const { app, PORT } = require('./Server/server')
;(async () => {
  await app.listen(PORT, () => console.log(`My port is ${PORT}`))
  // await syncDataBase()
})()
