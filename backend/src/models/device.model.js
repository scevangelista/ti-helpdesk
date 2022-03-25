const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Device = database.define('device', {
    device_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    purchased_at: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: true
    },
    serial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: true
    },
    device_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "device_types",
            key: "device_type_id",
        },
    },
    department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "departments",
            key: "department_id",
        },
    },
    manufacturer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "manufacturers",
            key: "manufacturer_id",
        },
    },
    staff_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "staffs",
            key: "staff_id",
        },
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
}, {
    tableName: 'devices',
    timestamps: false,
    freezeTableName: true
})

module.exports = Device;