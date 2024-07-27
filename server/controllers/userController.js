const { User } = require("../models/userModel")

module.exports.verifyemail = async function (req, res) {
    res.cookie("verified", true, { httpOnly: true, secure: true });
    console.log(req.cookies);
    return res.json({
        message: "Email Verified"
    });
}

module.exports.resetpassword = async function (req, res) {
    const user = await User.findOne({
        where: {
            resettoken: req.params.token
        }
    });
    if (user.email == req.body.email) {
        req.verified = true;
        return res.json({
            message: "Password Verified"
        });
    }
    return res.json({
        error: "Action Unauthorised"
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