const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");
const { User } = require("./userModel");
module.exports.Transaction = sequelize.define('seedTransaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transactionType: {
        type: DataTypes.ENUM('deposit', 'retrieve'),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    timestamps: true
});