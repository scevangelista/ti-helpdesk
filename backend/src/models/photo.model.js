const Sequelize = require('sequelize');
const database = require('./../../config/db');

const Photo = database.define('photo', {
    photo_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    revision_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "revisions",
            key: "revision_id",
        },
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
    tableName: 'photos',
    timestamps: false,
    freezeTableName: true
})

module.exports = Photo;