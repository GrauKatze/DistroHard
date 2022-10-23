const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("distrohard", "db_user", "1234", {
    host: "192.168.83.101",
    port: "5000",
    dialect: "postgres",
});
let logIN = true;

class User extends Model { }
User.init(
    {
        login: {
            type: DataTypes.STRING(12),
            primaryKey: true,
        },
        pass: DataTypes.STRING(50),
    },
    {
        sequelize,
        modelName: "Users",
        timestamps: false,
        freezeTableName: true,
    }
);
class Vendor extends Model { }
Vendor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        companyName: DataTypes.STRING(50),
    },
    {
        sequelize,
        modelName: "Vendors",
        timestamps: false,
        freezeTableName: true,
    }
);
class DistroLinux extends Model { }
DistroLinux.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product: DataTypes.STRING(50),
        version: DataTypes.STRING(50),
        vendor_id: {
            type: DataTypes.INTEGER,
            references: { model: Vendor, key: "id" },
        },
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
class HardwareType extends Model { }
HardwareType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: DataTypes.STRING(10)
    },
    {
        sequelize,
        modelName: "HardwareType",
        timestamps: false,
        freezeTableName: true,
    }
);
class Hardware extends Model { }
Hardware.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Device: DataTypes.STRING(20),
        vendor_id: {
            type: DataTypes.INTEGER,
            references: { model: Vendor, key: "id" },
        },
        type_id:{
            type: DataTypes.INTEGER,
            references: {model: HardwareType, key: "id"}
        }
    },
    {
        sequelize,
        modelName: "Hardware",
        timestamps: false,
        freezeTableName: true,
    }
);
class HardwareStatusOnLinux extends Model {}
HardwareStatusOnLinux.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Hardware_id: {
            type: DataTypes.INTEGER,
            references: { model: Hardware, key: "id" },
        },
        Status: DataTypes.STRING(25),
    },
    {
        sequelize,
        modelName: "HardwareStatusOnLinux",
        timestamps: false,
        freezeTableName: true,
    }
)

class ErrorStatusOnHardware extends Model{}
ErrorStatusOnHardware.init(
    {
        Error_id: {
            type: DataTypes.INTEGER,
            references: { model: Errors, key: "id" },
        },
        Processor_id: {
            type: DataTypes.INTEGER,
            references: { model: Hardware, key: "id" },
        },
        Status: DataTypes.STRING(25),
    },
    {
        sequelize,
        modelName: "ErrorStatusOnHardware",
        timestamps: false,
        freezeTableName: true,
    }
)
class ErrorStatusOnLinux extends Model { }
ErrorStatusOnLinux.init(
    {
        Error_id: {
            type: DataTypes.INTEGER,
            references: { model: Errors, key: "id" },
        },
        DistroLinux_id: {
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


async function syncDataBase() {
    await sequelize.sync({ }).then(() => {
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
async function updateData(Model, modelID, jsonData) {
    Model.update(jsonData, { where: { id: modelID } });
}
//work
async function deleteData(Model, jsonData) {
    Model.destroy({ where: jsonData });
}
//work
async function selectDataAll(Model) {
    return Model.findAll({ raw: true });
}
async function selectDataAllFiltr(Model, jsonData) {
    return Model.findAll({ raw: true, where: jsonData });
}
async function selectDataOne(Model, jsonData) {
    return Model.findOne({ raw: true, where: jsonData });
}

module.exports = {
    User,
    logIN,
    sequelize,
    syncDataBase,
    DistroLinux,
    selectDataAll,
    insertData,
    deleteData,
    Vendor,
    selectDataAllFiltr,
    selectDataOne,
    Errors,
    updateData,
    ErrorStatusOnLinux,
    Hardware
};
