const { User } = require("../models/userModel")

module.exports.getUser = async function (req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.putUser = async function (req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        for (let keys in req.body) {
            if (user.dataValues[keys]) {
                user.dataValues[keys] = req.body[keys];
                user.changed(user.dataValues[keys], true);
            }
        }
        // console.log(user);
        await user.save();
        await user.reload();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.deleteUser = async function (req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        await user.destroy();
        res.status(204).json({ message: "user Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}