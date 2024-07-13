const { sequelize } = require("../db");
const { Datatypes } = require("sequelize");
module.exports.files = sequelize.define('files', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    filename: {
        type: Datatypes.STRING,
        allowNull: false
    },
    contenttype: {
        type: Datatypes.STRING,
        allowNull: false
    },
    size: {
        type: Datatypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
});