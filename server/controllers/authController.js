const { where } = require("sequelize");
const { User } = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('crypto-token');
const { sendMail } = require("../utility/nodemailer");

module.exports.register = async function (req, res) {
    try {
        const { username, email, password, role, contact_number, address, farm_size } = req.body;
        const resetToken = token(32);
        const resetLink = `${req.protocol}://${req.headers.host}/verify/${resetToken}`;
        sendMail("verify", {
            email: email,
            link: resetLink
        });
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);
        const new_user = await User.create({ username, email, password:hashed, role, contact_number, address, farm_size, resettoken:resetToken});
        req.role = role;
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
        if (!user.verified) {
            return res.json({
                message: "Please verify your email through the link sent at your email"
            });
        }
        const token = await jwt.sign({ uid: user.id, username: user.username }, process.env.JWT_SECRET);
        res.cookie("isLoggedIn", token, { httpOnly: true, secure: true });
        req.role = req.body.role;
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

module.exports.protectRoute = async function (req, res, next){
    try {
        if (req.cookies.isLoggedIn) {
            const payload = jwt.verify(req.cookies.isLoggedIn, process.env.JWT_SECRET);
            if (payload) {
                const user = await User.findByPk(payload.uid);
                req.role = user.role;
                req.body.id = user.id; 
                return next();
            }
            return res.status(401).json({ error: "Unauthorised" });
        }
        const client = req.get["User-Agent"];
        if (client.includes("Mozilla")) {
            return res.redirect("/login");
        }
        return res.status(401).json({ error: "Operation Not Allowed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.isAuthorised = function (roles) {
    return function (req, res, next) {
        if (roles.includes(req.role)) {
            return next();
        }
        return res.status(401).json({ error: "Unauthorised" });
    }
}

module.exports.resetpassword = async function (req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        const resetToken = user.resettoken;
        const resetLink = `${req.protocol}://${req.headers.host}/api/resetpassword/${resetToken}`;
        sendMail("reset", {
            email: user.email,
            link: resetLink
        });
        res.status(201).json({ message: "Link Sent" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.resetpasswordutil = async function (req, res) {
    try {
        const user = User.findOne({ where: { resettoken: req.params.token } });
        if (!user) return res.json({ message: "Invalid Link" });
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const resetToken = token(32);
        user.password = hashed;
        user.resettoken = resetToken;
        await user.save();
        await user.reload();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
