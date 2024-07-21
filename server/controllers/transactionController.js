const { sequelize } = require("../db");
const { Seed } = require("../models/seedModel");
const { Transaction } = require("../models/transactionModel");

module.exports.depositSeeds = async function (req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { type, quantity } = req.body;
        const userId = req.params.id;
        const seed = await Seed.findOne({ where: { type, quantity } });
        if (seed) {
            seed.quantity += quantity;
            await seed.save({ transaction });
        }
        else {
            await transaction.rollback();
            return res.status(404).json({ message: "Seed Not Found" });
        }
        await Transaction.create({
            transactionType: 'deposit',
            userId: req.params.id,
            type,
            quantity
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Seeds deposited successfully' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ error: err.message });
    }
}

module.exports.retrieveSeeds = async function (req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { type, quantity } = req.body;
        const userId = req.params.id;
        const seed = await Seed.findOne({ where: { type, quantity } });
        if (!seed) {
            throw new Error('Insufficient seeds available for retrieval');
        }
        seed.quantity -= quantity;
        await seed.save({ transaction });

        await Transaction.create({
            transactionType: 'retrieve',
            userId: req.params.id,
            type,
            quantity
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Seeds retrieved successfully' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ error: err.message });
    }
}