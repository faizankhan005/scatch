const cookieParser = require('cookie-parser');
const express = require('express');
const db = require("./config/mongoose-connection")
const app = express();
const path = require('path');
const flash = require('connect-flash');
const expressSession = require('express-session');
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { hash } = require('crypto');
const crypto = require('crypto');
const generateToken = require("./utils/generateToken");



const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");




app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false, 
        saveUninitialized: true, 
        secret: process.env.EXPRESS_SEASSION_KEY,
}));
app.use(flash());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000, () => {
    console.log('Server is running on. http://localhost:3000');
});