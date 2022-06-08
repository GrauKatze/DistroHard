const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("distrohard", "graukatze", "1234", {
  host: "localhost",
  dialect: "postgres",
});

class Vendor extends Model { }
Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: DataTypes.STRING(50)
  },
  {
    sequelize,
    modelName: "Vendors",
    timestamps: false,
    freezeTableName: true,
  }
)
class Processor extends Model { }
Processor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    modelName: DataTypes.STRING(50),
    vendor_id: { type: DataTypes.INTEGER, references: { model: Vendor, key: "id" } },
  },
  {
    sequelize,
    modelName: "Processors",
    timestamps: false,
    freezeTableName: true,
  }
)
class VideoCard extends Model { }
VideoCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    modelName: DataTypes.STRING(50),
    vendor_id: { type: DataTypes.INTEGER, references: { model: Vendor, key: "id" } },

  },
  {
    sequelize,
    modelName: "VideoCards",
    timestamps: false,
    freezeTableName: true,
  }
)

class DistroLinux extends Model { }
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
class Errors extends Model { }
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
class HardStatusOnLinux extends Model { }
HardStatusOnLinux.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Hard_id: {
      type: DataTypes.INTEGER,
      references: { model: Processor, key: "id" },
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
class ErrorStatusOnLinux extends Model { }
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
class ErrorStatusOnHard extends Model { }
ErrorStatusOnHard.init(
  {
    Error_id: {
      type: DataTypes.INTEGER,
      references: { model: Errors, key: "id" },
    },
    Hard_id: {
      type: DataTypes.INTEGER,
      references: { model: Processor, key: "id" },
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
  return Model.findAll({ raw: true })
}
function selectDataOne(Model, jsonData) {
  return Model.findOne({ where: jsonData });
}
function returnResultFind() { return selectDataAll(Hard) }

module.exports = {
  sequelize,
  syncDataBase,
  DistroLinux,
  HardStatusOnLinux,
  selectDataAll,
  insertData,
  deleteData,
  returnResultFind,
  Vendor,
  Processor,
  VideoCard
};
