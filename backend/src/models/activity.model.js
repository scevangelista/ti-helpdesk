const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Activity = database.define('activity', {
    activity_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    staff_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "staffs",
            key: "staff_id",
        },
    },
    ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tickets",
            key: "ticket_id",
        },
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    automatic: {
        type: Sequelize.BOOLEAN,
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
    tableName: 'activities',
    timestamps: false,
    freezeTableName: true
})

module.exports = Activity;