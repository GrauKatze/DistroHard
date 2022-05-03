const Sequelize = require('sequelize')
const db = new Sequelize('postgres://graukatze:1234@localhost:5432/DistroHard')

const Hard = db.define('HARDS', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  vendor: Sequelize.STRING(50),
  model: Sequelize.STRING(50),
  Type: Sequelize.STRING(50),
})

db.sync({ force: true }).then(() => {
  Hard.create({
    //id: 0,
    vendor: 'pupu',
    model: 'XJ9 3000',
    Type: 'robot',
  }).then((hard) => {
    console.log(hard)
  })
})

module.exports = {
  db,
  Hard,
}
