const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
module.exports.seeds = sequelize.define('seeds', {
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
    },
    deposited_by: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
});