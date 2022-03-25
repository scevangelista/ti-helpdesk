const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Monitor = database.define('monitor', {
    monitor_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    device_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "devices",
            key: "device_id",
        },
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cpu: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpu_usage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cpu_usage_details: {
        type: Sequelize.STRING,
        allowNull: true
    },
    memory: {
        type: Sequelize.STRING,
        allowNull: false
    },
    memory_usage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    memory_usage_details: {
        type: Sequelize.STRING,
        allowNull: true
    },
    storage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    storage_usage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    storage_usage_details: {
        type: Sequelize.STRING,
        allowNull: true
    },
    user_logged: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uptime: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    installed_apps: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    tableName: 'monitors',
    timestamps: false,
    freezeTableName: true
})

module.exports = Monitor;