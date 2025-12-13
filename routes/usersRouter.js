const express = require('express');
const router = express.Router();
const { registerUser } = require("../controllers/authController");
const jwt = require("jsonwebtoken");


router.get("/", function (req, res) {
    res.send("hey");
});
router.post("/create", registerUser );

module.exports = router;