const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
module.exports.files = sequelize.define('files', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    filename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contenttype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
});