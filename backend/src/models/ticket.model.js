const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Ticket = database.define('ticket', {
    ticket_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    owner_staff_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "staffs",
            key: "staff_id",
        },
    },
    designated_staff_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "staffs",
            key: "staff_id",
        },
    },
    device_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "devices",
            key: "device_id",
        },
    },
    ticket_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "ticket_types",
            key: "ticket_type_id",
        },
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    satisfaction_note: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
    closed_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
}, {
    tableName: 'tickets',
    timestamps: false,
    freezeTableName: true
})

module.exports = Ticket;