const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Transfer = database.define('transfer', {
    transfer_id: {
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
    old_staff_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "staffs",
            key: "staff_id",
        },
    },
    new_staff_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "staffs",
            key: "staff_id",
        },
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    }
}, {
    tableName: 'transfers',
    timestamps: false,
    freezeTableName: true
})

module.exports = Transfer;