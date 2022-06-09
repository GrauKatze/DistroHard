const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("distrohard", "graukatze", "1234", {
    host: "localhost",
    dialect: "postgres",
});

class Vendor extends Model {}
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
class Processor extends Model {}
Processor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        modelName: DataTypes.STRING(50),
        vendor_id: {
            type: DataTypes.INTEGER,
            references: { model: Vendor, key: "id" },
        },
    },
    {
        sequelize,
        modelName: "Processors",
        timestamps: false,
        freezeTableName: true,
    }
);
class VideoCard extends Model {}
VideoCard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        modelName: DataTypes.STRING(50),
        vendor_id: {
            type: DataTypes.INTEGER,
            references: { model: Vendor, key: "id" },
        },
    },
    {
        sequelize,
        modelName: "VideoCards",
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
class ProcessorStatusOnLinux extends Model {}
ProcessorStatusOnLinux.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Processor_id: {
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
        modelName: "ProcessorStatusOnLinux",
        timestamps: false,
        freezeTableName: true,
    }
);
class VideoCardStatusOnLinux extends Model {}
VideoCardStatusOnLinux.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        VideoCard_id: {
            type: DataTypes.INTEGER,
            references: { model: VideoCard, key: "id" },
        },
        DistLinux_id: {
            type: DataTypes.INTEGER,
            references: { model: DistroLinux, key: "id" },
        },
        Status: DataTypes.STRING(25),
    },
    {
        sequelize,
        modelName: "VideoCardStatusOnLinux",
        timestamps: false,
        freezeTableName: true,
    }
);
class ErrorStatusOnProcessor extends Model {}
ErrorStatusOnProcessor.init(
    {
        Error_id: {
            type: DataTypes.INTEGER,
            references: { model: Errors, key: "id" },
        },
        Processor_id: {
            type: DataTypes.INTEGER,
            references: { model: Processor, key: "id" },
        },
        Status: DataTypes.STRING(25),
    },
    {
        sequelize,
        modelName: "ErrorStatusOnProcessor",
        timestamps: false,
        freezeTableName: true,
    }
);
class ErrorStatusOnVideoCard extends Model {}
ErrorStatusOnVideoCard.init(
    {
        Error_id: {
            type: DataTypes.INTEGER,
            references: { model: Errors, key: "id" },
        },
        VideoCard_id: {
            type: DataTypes.INTEGER,
            references: { model: VideoCard, key: "id" },
        },
        Status: DataTypes.STRING(25),
    },
    {
        sequelize,
        modelName: "ErrorStatusOnVideoCard",
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
    sequelize,
    syncDataBase,
    DistroLinux,
    selectDataAll,
    insertData,
    deleteData,
    Vendor,
    Processor,
    VideoCard,
    selectDataAllFiltr,
    selectDataOne,
    ProcessorStatusOnLinux,
    VideoCardStatusOnLinux,
    Errors,
    updateData,
    ErrorStatusOnLinux,
    ErrorStatusOnVideoCard,
    ErrorStatusOnProcessor,
    VideoCardStatusOnLinux,
    ProcessorStatusOnLinux,
};
