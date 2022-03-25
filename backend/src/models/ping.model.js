const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Ping = database.define('ping', {
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
    time: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
}, {
    tableName: 'pings',
    timestamps: false,
    freezeTableName: true
})

Ping.removeAttribute('id');

module.exports = Ping;