const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Auth = database.define('auth', {
    auth_id: {
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
    administrator: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
}, {
    tableName: 'auths',
    timestamps: false,
    freezeTableName: true
})

module.exports = Auth;