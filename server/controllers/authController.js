const { where } = require("sequelize");
const { User } = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async function (req, res) {
    try {
        const { username, email, password, role, contact_number, address, farm_size } = req.body;
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);
        const new_user = await User.create({ username, email, password:hashed, role, contact_number, address, farm_size });
        res.status(201).json(new_user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.login = async function (req, res) {
    try {
        const username = req.body.username;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        const token = await jwt.sign({ uid: user.id, username: user.username }, process.env.JWT_SECRET);
        res.cookie("isLoggedIn", token, { httpOnly: true, secure: true });
        res.status(201).json({ message: "Logged In" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.logout = async function (req, res) {
    try {
        res.cookie("isLoggedIn", {}, { maxAge: 0 });
        res.status(201).json({ message: "User logged Out" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}