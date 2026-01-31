const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
const productModel = require('../models/product-model');


module.exports = upload;
