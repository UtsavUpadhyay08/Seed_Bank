const { sequelize } = require("../db");
const { Sequelize, SequelizeScopeError } = require("sequelize");
module.exports.User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdat'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedat'
    },
    resettoken: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps:true});