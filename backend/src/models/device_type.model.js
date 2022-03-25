const Sequelize = require('sequelize');
const database = require('./../../config/db');

const DeviceType = database.define('device_type', {
    device_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
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
    tableName: 'device_types',
    timestamps: false,
    freezeTableName: true
})

module.exports = DeviceType;