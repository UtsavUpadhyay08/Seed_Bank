const { sequelize } = require("../server/db");
const { Sequelize } = require("sequelize");
module.exports.Event = sequelize.define('events', {
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
    },
    createdAt: {
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