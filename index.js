const { syncDataBase, Hard } = require('./src/Server/dataBase')
const { app, PORT } = require('./src/Server/server')
;(async () => {
  app.listen(PORT, () => console.log(`My port is ${PORT}`))
  await syncDataBase().then(() => {
    Hard.create({
      vendor: 'pipi',
      model: 'pupu',
      Type: 'robot',
    }).then((hard) => console.log(hard))
  })
})()
