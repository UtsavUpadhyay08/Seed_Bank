const { sequelize } = require("../db");
const { Datatypes } = require("sequelize");
module.exports.events = sequelize.define('events', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Datatypes.STRING,
        allowNull: false
    },
    description: {
        type: Datatypes.STRING,
        allowNull: false
    },
    date: {
        type: Datatypes.STRING,
        allowNull: false
    },
    location: {
        type: Datatypes.STRING
    },
    organiser: {
        type: Datatypes.STRING
    }
},{
    timestamps: true
});