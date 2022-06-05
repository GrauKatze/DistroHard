const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("distrohard", "graukatze", "1234", {
  host: "localhost",
  dialect: "postgres",
});

class Hards extends Model {}
Hards.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vendor: DataTypes.STRING(50),
    model: DataTypes.STRING(50),
    Type: DataTypes.STRING(50),
  },
  {
    sequelize,
    modelName: "Hards",
    timestamps: false,
    freezeTableName: true,
  }
);

class DistroLinux extends Model {}
DistroLinux.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vendor: DataTypes.STRING(50),
    version: DataTypes.STRING(50),
  },
  {
    sequelize,
    modelName: "DistroLinux",
    timestamps: false,
    freezeTableName: true,
  }
);
class Errors extends Model {}
Errors.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codeCVE: {
      type: DataTypes.STRING(20),
    },
  },
  {
    sequelize,
    modelName: "Errors",
    timestamps: false,
    freezeTableName: true,
  }
);
class HardStatusOnLinux extends Model {}
HardStatusOnLinux.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Hard_id: {
      type: DataTypes.INTEGER,
      references: { model: Hards, key: "id" },
    },
    DistLinux_id: {
      type: DataTypes.INTEGER,
      references: { model: DistroLinux, key: "id" },
    },
    Status: DataTypes.STRING(25),
  },
  {
    sequelize,
    modelName: "HardStatusOnLinux",
    timestamps: false,
    freezeTableName: true,
  }
);
class ErrorStatusOnLinux extends Model {}
ErrorStatusOnLinux.init(
  {
    Error_id: {
      type: DataTypes.INTEGER,
      references: { model: Errors, key: "id" },
    },
    DistLinux_id: {
      type: DataTypes.INTEGER,
      references: { model: DistroLinux, key: "id" },
    },
    Status: DataTypes.STRING(25),
  },
  {
    sequelize,
    modelName: "ErrorStatusOnLinux",
    timestamps: false,
    freezeTableName: true,
  }
);
class ErrorStatusOnHard extends Model {}
ErrorStatusOnHard.init(
  {
    Error_id: {
      type: DataTypes.INTEGER,
      references: { model: Errors, key: "id" },
    },
    Hard_id: {
      type: DataTypes.INTEGER,
      references: { model: Hards, key: "id" },
    },
    Status: DataTypes.STRING(25),
  },
  {
    sequelize,
    modelName: "ErrorStatusOnHards",
    timestamps: false,
    freezeTableName: true,
  }
);

async function syncDataBase() {
  await sequelize.sync({ alter: true }).then(() => {
    console.log("\n================Basa was sync================");
  });
}

//===========================
//-----FUNC FOR DATABASE-----
//===========================
//work
function insertData(Model, jsonData) {
  Model.create(jsonData);
}
function updateData(modelID, jsonData) {
  Model.update(jsonData, { where: { id: modelID } });
}
//work
function deleteData(Model, modelID) {
  Model.destroy({ where: { id: modelID } });
}
//work
function selectDataAll(Model) {
  return Model.findAll();
}
function selectDataOne(Model, jsonData) {
  return Model.findOne({ where: jsonData });
}

module.exports = {
  sequelize,
  syncDataBase,
  Hard: Errors,
  DistroLinux,
  Status: HardStatusOnLinux,
  selectDataAll,
  insertData,
  deleteData,
};
