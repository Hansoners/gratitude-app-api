const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_string_for_development");
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed in check-auth." });
    }
};