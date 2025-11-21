const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: String,
    descount:{
        type: Number,
        default: 0
    },
    bgcolour: String,
    panelcolour: String,
    textclour: String

});

module.exports = mongoose.model("product", productSchema);