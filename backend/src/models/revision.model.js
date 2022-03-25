const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Revision = database.define('revision', {
    revision_id: {
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
    staff_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "staffs",
            key: "staff_id",
        },
    },
    date: {
        type: Sequelize.DATEONLY,
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
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'revisions',
    timestamps: false,
    freezeTableName: true
})

module.exports = Revision;