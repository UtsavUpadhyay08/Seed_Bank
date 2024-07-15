const { where } = require("sequelize");
const { User } = require("../models/userModel");

module.exports.register = async function (req, res) {
    try {
        const { username, email, password, role, contact_number, address, farm_size }=req.body;
        const new_user = await User.create({ username, email, password, role, contact_number, address, farm_size });
        res.status(201).json(new_user);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports.login = async function (req, res) {
    try {
        const username = req.body.username;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                error: "User Not Found"
            });
        }
        if (req.body.password !== user.password) {
            return res.status(401).json({
                error: "Invalid Credentials"
            });
        }
        res.status(201).json({
            message: "Logged In"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}