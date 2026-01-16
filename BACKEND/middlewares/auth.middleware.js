const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

exports.protect = async ( req , res , next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message : "Not authenticated"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}