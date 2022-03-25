const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Departament = database.define('department', {
    department_id: {
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
    tableName: 'departments',
    timestamps: false,
    freezeTableName: true
})

module.exports = Departament;