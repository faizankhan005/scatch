const express = require('express');
const router = express.Router();
const productModel = require("../models/product-model"); 
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');




router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false});
});

// router.get("/shop", isLoggedin , (req, res) => {
//     res.render("shop");
// });
router.get("/login", (req, res) => {
    res.render("login"); // views/login.ejs must exist
});
router.get("/shop", isLoggedin, async (req, res) => {
    try {

        const products = await productModel.find();
        let success = req.flash("success");
        res.render("shop", { products, success});
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
router.get("/cart", isLoggedin, async (req, res) => {
    try {
        const user = await userModel
            .findOne({ email: req.user.email })
            .populate('cart');

        // If cart is empty, default to 0
        const product = user.cart?.[0] || { price: 0, discount: 0 };

        // Convert to numbers safely
        const price = parseFloat(product.price) || 0;
        const discount = parseFloat(product.discount) || 0;
        const shipping = 20;

        const bill = price + shipping - discount;

        res.render("cart", { user, bill });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// router.get("/cart", isLoggedin,  async (req, res) => {
//     let user = await userModel
//     .findOne({email:req.user.email})
//     .populate('cart')
//     const bill = Number(user.cart[0].price)+20 - Number(user.cart[0].discount);
//     // const bill = user.cart[0].price = Number(user.cart[0].price);
//     // const discount = user.cart[0].discount = Number(user.cart[0].discount);
//     res.render("cart", {user , bill });
// });
router.get("/account", isLoggedin, async (req, res) => {
  const user = req.user;

  // Temporary empty arrays (until you implement orders/favorites)
  const orders = user.orders || [];
  const favorites = user.favorites || [];
  const recentlyViewed = user.recentlyViewed || [];
  const payments = user.paymentMethods || [];

  res.render("account", {
    user,
    orders,
    favorites,
    recentlyViewed,
    payments
  });
});


// Change password
router.post("/users/change-password", isLoggedin, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect("/account");
  }
  const user = await userModel.findById(req.user._id);
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    req.flash("error", "Current password is incorrect");
    return res.redirect("/account");
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  req.flash("success", "Password updated successfully");
  res.redirect("/account");
});


router.get("/addtocart/:productid", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Product added to cart successfully!");
    res.redirect("/shop");
    // try {
    //     const productId = req.params.id;
    //     const product = await productModel.findById(productId);
    //     if (!product) {
    //         return res.status(404).send("Product not found");
    //     }
    //     // Here you would typically add the product to the user's cart in the database
    //     // For simplicity, we'll just redirect back to the shop page
    //     res.redirect("/shop");
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send("Server Error");
    // }
});

module.exports = router;
