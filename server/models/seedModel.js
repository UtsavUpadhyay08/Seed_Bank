const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
module.exports.Seed = sequelize.define('seeds', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    storage_method: {
        type: Sequelize.STRING,
        allowNull: false
    },createdAt: {
        type: Sequelize.DATE,
        field: 'createdat'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedat'
    },
},{
    timestamps: true
});