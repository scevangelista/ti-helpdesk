const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Furniture = database.define('furniture', {
    furniture_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    purchased_at: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: true
    },
    department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "departments",
            key: "department_id",
        },
    },
    staff_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "staffs",
            key: "staff_id",
        },
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
    tableName: 'furnitures',
    timestamps: false,
    freezeTableName: true
})

module.exports = Furniture;