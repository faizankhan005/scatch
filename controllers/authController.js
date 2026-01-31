const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        const { email, fullname, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            email,
            fullname,
            password: hash,
        });

        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");   // or "/" if you prefer
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.logoutUser = function (req, res) {
    try {
        res.clearCookie("token");
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};
