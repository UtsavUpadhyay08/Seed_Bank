const { sequelize } = require("../db");
const { Datatypes } = require("sequelize");
module.exports.user = sequelize.define('users', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false
    },
    role: {
        type: Datatypes.STRING,
        allowNull: false
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false
    },
    contact_number: {
        type: Datatypes.STRING,
        allowNull: false
    },
    address: {
        type: Datatypes.STRING,
        allowNull: false
    },
    farm_size: {
        type: Datatypes.INTEGER
    }
},{
    timestamps: true
});