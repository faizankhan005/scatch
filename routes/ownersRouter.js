const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", function(req, res) {
    res.send("hey");
});

router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
        return res
            .status(504)
            .send("you dont have permission to create the owner model");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    });
    res.status(202).send(createdOwner);
});

router.get("/admin", (req, res) => {
    res.render("createproducts", { success: req.flash("success") || [] });
});

// ✅ NEW: Handle product creation
router.post("/admin/product", upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.buffer,
        });

        req.flash("success", "Product created successfully!");
        res.redirect("/owners/admin");
    } catch (err) {
        console.log(err.message);
        res.redirect("/owners/admin");
    }
});

module.exports = router;
