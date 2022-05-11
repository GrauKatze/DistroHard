const {
  syncDataBase,
  Hard,
  DistLinux,
  Status,
} = require('./src/Server/dataBase')
const { app, PORT } = require('./src/Server/server')
;(async () => {
  await serverStart()
})()

let jsonDataHard = {
  id: '408eef01-7e1b-458c-bfec-e215c3470dab',
  vendor: 'pipi',
  model: 'jgrp',
  Type: 'test',
}
let jsonDataDistr = {
  id: '4ee43aaa-7693-4b6c-ad57-9e43afb3bf75',
  vendor: 'pipidis',
  version: 'versiondis',
}
let lethard, letdistr
async function serverStart() {
  app.listen(PORT, () => console.log(`My port is ${PORT}`))
  await syncDataBase().then(() => {
    //
    //===========TEST CODE============
    //
    Hard.create(jsonDataHard).then((hard) => {
      lethard = hard
      console.log('HARD ID === ' + lethard.id)
    })
    DistLinux.create(jsonDataDistr).then((distr) => {
      letdistr = distr
      console.log('DIST ID === ' + letdistr.id)
    })
    Status.create({
      Hard_id: '408eef01-7e1b-458c-bfec-e215c3470dab',
      DistLinux_id: '4ee43aaa-7693-4b6c-ad57-9e43afb3bf75',
      Status: 'good',
    }).then((status) =>
      console.log(status.id, status.Hard_id, status.DistLinux_id, status.Status)
    )
  })
}
