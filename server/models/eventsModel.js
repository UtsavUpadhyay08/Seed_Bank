const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
module.exports.events = sequelize.define('events', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING
    },
    organiser: {
        type: Sequelize.STRING
    }
},{
    timestamps: true
});