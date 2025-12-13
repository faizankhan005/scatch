const cookieParser = require('cookie-parser');
const express = require('express');
const db = require("./config/mongoose-connection")
const app = express();
const path = require('path');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { hash } = require('crypto');
const crypto = require('crypto');
const {generateToken} = require("./utils/generateToken");



const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

require('dotenv').config();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000, () => {
    console.log('Server is running on. http://localhost:3000');
});