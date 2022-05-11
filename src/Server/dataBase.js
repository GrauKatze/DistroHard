const { json } = require('express/lib/response')
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('DistroHard', 'graukatze', '1234', {
  host: 'localhost',
  dialect: 'postgres',
})

class Hard extends Model {}
Hard.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vendor: DataTypes.STRING(50),
    model: DataTypes.STRING(50),
    Type: DataTypes.STRING(50),
  },
  {
    sequelize,
    modelName: 'HARD',
  }
)

class DistLinux extends Model {}
DistLinux.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vendor: DataTypes.STRING(50),
    version: DataTypes.STRING(50),
  },
  { sequelize, modelName: 'DistrLinux' }
)

class Status extends Model {}
Status.init(
  {
    Hard_id: {
      type: DataTypes.UUID,
      references: { model: Hard, key: 'id' },
    },
    DistLinux_id: {
      type: DataTypes.UUID,
      references: { model: DistLinux, key: 'id' },
    },
    Status: DataTypes.STRING(25),
  },
  { sequelize, modelName: 'Status' }
)
async function syncDataBase() {
  await sequelize.sync({ force: true }).then(() => {
    console.log('\n================Basa was sync================')
  })
}

function insertData(Model, jsonData) {
  Model.create(jsonData)
}
function updateData(modelID, jsonData) {
  Model.update(jsonData, { where: { id: modelID } })
}
function deleteData(modelID) {
  Model.del({ where: { id: modelID } })
}
function selectDataAll(Model, jsonData) {
  const data = Model.findAll({ where: jsonData  })
  return data
}
function selectDataOne(Model, jsonData) {
  const data = Model.findOne({ where: jsonData })
  return data
}

module.exports = {
  sequelize,
  syncDataBase,
  Hard,
  DistLinux,
  Status,
}
