const { User } = require("../models/userModel")

module.exports.verifyemail = async function (req, res) {
    try {
        const user = await User.findOne({ where: { resettoken: req.params.token } });
        if (!user) return res.json({ message: "Invalid Link" });
        user.verified = true;
        await user.save();
        return res.status(201).json({
            message: "Email Verified"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

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
        for (let key in req.body) {
            if (user.dataValues.hasOwnProperty(key)) {
                user.set(key, req.body[key]);
            }
        }
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
