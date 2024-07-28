const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
const { User } = require("./userModel");
module.exports.Transaction = sequelize.define('seedtransaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transactionType: {
        type: Sequelize.ENUM('deposit', 'retrieve'),
        field: 'transactiontype',
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'userid'
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
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
},{
    timestamps: true,
    tableName: 'seedtransaction'
});