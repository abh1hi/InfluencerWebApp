// backend/middleware/admin.js
module.exports = function (req, res, next) {
    // Make sure req.user is available and has the correct role
    if (req.user && req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Authorization denied. Admin access required.' });
    }
    // If the role is correct, proceed
    next();
};