const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", function(req, res) {
    res.send("hey");
});

router.post("/create", async (req, res)=>{
    let owners = await ownerModel.find();
    if(owners.length > 0){
        return res
        .status(504)
        .send("you dont have permission to create the owner model")
    }
    let {fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    });
    res.status(202).send(createdOwner);
});



module.exports = router;