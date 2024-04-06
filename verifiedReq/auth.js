const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token Expired' });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_KEY);
        req.user = decoded;
        console.log("VERIFIED REQUEST",req.user);
        next();
    } catch (error) {
        return res.status(501).json({ error: 'Unauthorized: Token not Provided' });
    }
};

module.exports = verifyToken;
