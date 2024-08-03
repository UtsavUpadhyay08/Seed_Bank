const { sequelize } = require("../db");
const { Seed } = require("../models/seedModel");
const { Transaction } = require("../models/transactionModel");

module.exports.depositSeeds = async function (req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { type, quantity } = req.body;
        const userId = req.params.id;
        const seed = await Seed.findOne({ where: { type } });
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
            type: type,
            quantity: quantity
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
        const seed = await Seed.findOne({ where: { type } });
        const total = await Transaction.sum('quantity', {
            where: {
                transactionType: 'deposit',
                userId: req.params.id
            }
        });
        const total1 = await Transaction.sum('quantity', {
            where: {
                transactionType: 'retrieve',
                userId: req.params.id
            }
        });
        if (!seed || seed.quantity<quantity || quantity>(total-total1)) {
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

module.exports.totaldeposited = async function (req, res) {
    try {
        const total = await Transaction.sum('quantity', {
            where: {
                transactionType: 'deposit',
                userId: req.params.id
            }
        });
        res.status(201).json({ "message":total });
    } catch (err) { res.status(500).json({ error: err.message }); }
}

module.exports.totalretrieved = async function (req, res) {
    try {
        const total = await Transaction.sum('quantity', {
            where: {
                transactionType: 'retrieve',
                userId: req.params.id
            }
        });
        res.status(201).json({ total });
    } catch (err) { res.status(500).json({ error: err.message }); }
}

module.exports.alltransactions = async function (req, res) {
    try {
        const transactions = await Transaction.findAll({ where: { userId:req.params.id } });
        res.status(201).json({ transactions });
    } catch (err) { res.status(500).json({ error: err.message }); }
}
