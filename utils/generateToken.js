

const jwt = require("jsonwebtoken");

function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_KEY,
        { expiresIn: "7d" }
    );
}

module.exports = generateToken;
// const jwt = require("jsonwebtoken");
// const genrateToken = (user) => {
//     console.log(process.env.JWT_KEY);
//     return jwt.sign(
//         {
//             email: user.email,
//             id: user._id,
//         },
//         process.env.JWT_KEY
//     );
// };

// module.exports.genrateToken = genrateToken;


// utils/generateToken.js
// const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//     return jwt.sign(
//         {
//             email: user.email,
//             id: user._id,
//         },
//         process.env.JWT_KEY,
//         { expiresIn: "1d" } // optional
//     );
// };

// module.exports = generateToken;  // export the function directly
