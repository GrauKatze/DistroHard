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
    modelName: 'Hard',
    timestamps: false,
    freezeTableName: true,
  }
)

class DistroLinux extends Model {}
DistroLinux.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vendor: DataTypes.STRING(50),
    version: DataTypes.STRING(50),
  },
  {
    sequelize,
    modelName: 'DistroLinux',
    timestamps: false,
    freezeTableName: true,
  }
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
      references: { model: DistroLinux, key: 'id' },
    },
    Status: DataTypes.STRING(25),
  },
  {
    sequelize,
    modelName: 'Status',
    timestamps: false,
    freezeTableName: true,
  }
)

async function syncDataBase() {
  await sequelize.sync({}).then(() => {
    console.log('\n================Basa was sync================')
  })
}

//===========================
//-----FUNC FOR DATABASE-----
//===========================
//work
function insertData(Model, jsonData) {
  Model.create(jsonData)
}
function updateData(modelID, jsonData) {
  Model.update(jsonData, { where: { id: modelID } })
}
//work
function deleteData(Model, modelID) {
  Model.destroy({ where: { id: modelID } })
}
//work
function selectDataAll(Model) {
  return Model.findAll()
}
function selectDataOne(Model, jsonData) {
  return Model.findOne({ where: jsonData })
}

module.exports = {
  sequelize,
  syncDataBase,
  Hard,
  DistroLinux,
  Status,
  selectDataAll,
  insertData,
  deleteData,
}
