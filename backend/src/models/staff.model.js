const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Staff = database.define('staff', {
    staff_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: Sequelize.STRING,
    administrator: {
        type: Sequelize.BOOLEAN
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
}, 
{
    tableName: 'staffs',
    timestamps: false,
    freezeTableName: true
})

module.exports = Staff;