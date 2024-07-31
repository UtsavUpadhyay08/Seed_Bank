const { User } = require("../models/userModel")

module.exports.verifyemail = async function (req, res) {
    const user = await User.findOne({ where: { resettoken: req.params.token } });
    if (!user) return res.json({ message: "No such user found" });
    user.verified = true;
    await user.save();
    return res.json({
        message: "Email Verified"
    });
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