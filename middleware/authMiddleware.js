const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    //const token = req.header('Authorization');
    const token = req.cookies.token;
    if (!token) return res.redirect('/api/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect('/api/login');
    }
};

module.exports = authMiddleware;
