const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtConfig.secret);
            req.user = decoded.user;
        } catch (e) {
        } finally {
            next();
        }
    } else {
        next();
    }
};