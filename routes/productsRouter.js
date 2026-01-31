const express = require('express');
const router = express.Router();
const uplaod = require("../config/multer-config");

router.get("/create",uplaod.single("image"), async function(req, res) {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        req.flash("success", "Product created successfully!");
        res.redirect("/owners/admin");  
    } catch (err) {
        console.log(err.message);
        
    }       
});


module.exports = router;