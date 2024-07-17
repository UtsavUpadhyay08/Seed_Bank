const { Seed } = require("../models/seedModel")

module.exports.getAllSeeds = async function (req, res) {
    try {
        const seeds = await Seed.findAll();
        res.status(201).json(seeds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.getSeedById = async function (req, res) {
    try {
        const seed = await Seed.findByPk(req.params.id);
        if (!seed) {
            return res.status(404).json({ error: "Seed not found" });
        }
        res.status(201).json(seed);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.createSeed = async function (req, res) {
    try {
        const { type,quantity,storage_method }=req.body;
        const new_seed = await Seed.create({ type,quantity,storage_method });
        res.status(201).json(new_seed);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports.putSeed = async function (req, res) {
    try {
        const seed = await Seed.findByPk(req.params.id);
        if (!seed) {
            return res.status(404).json({ error: "Seed not found" });
        }
        for (let keys in req.body) {
            if (seed.dataValues[keys]) {
                seed.dataValues[keys] = req.body[keys];
                seed.changed(seed.dataValues[keys], true);
            }
        }
        console.log(seed);
        await seed.save();
        await seed.reload();
        res.status(201).json(seed);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.deleteSeed = async function (req, res) {
    try {
        const seed = await Seed.findByPk(req.params.id);
        if (!seed) {
            return res.status(404).json({ error: "Seed not found" });
        }
        await seed.destroy();
        res.status(204).json({ message: "Seed Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}