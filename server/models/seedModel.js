const { sequelize } = require("../db");
const { Datatypes } = require("sequelize");
module.exports.seeds = sequelize.define('seeds', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Datatypes.STRING,
        allowNull: false
    },
    quantity: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    storage_method: {
        type: Datatypes.STRING,
        allowNull: false
    },
    deposited_by: {
        type: Datatypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
});