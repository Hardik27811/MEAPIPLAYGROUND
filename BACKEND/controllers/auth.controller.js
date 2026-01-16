const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model')


const cookiesOptions = {
    httpOnly : true,
    secure : true,
    sameSite : 'none',
    maxAge : 24 * 60 * 60 * 1000,
}


exports.Register = async (req,res)=>{

    const {name ,email ,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message : "Name , Email and Password is required"
        })
    }
    const checkuser = await User.findOne({email});
    if(checkuser){
        return res.status(400).json({
            message : "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({name ,email ,password:hashedPassword});

    const token = jwt.sign(
        {userId : user._id},
        process.env.JWT_SECRET,
        {expiresIn : '1d'}
    )
    res.status(201)
    .cookie('token',token,cookiesOptions)
    .json({
        message : "User registered successfully",
        sucess : true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}


exports.Login = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
         return res.status(400).json({
            message : " Email and Password is required"
        })
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
             message: "User not found" 
        })
    }

    const isMatch = await bcrypt.compare(password ,user.password)
    if(!isMatch){
         return res.status(400).json({
              message: "Invalid credentials" 
        })
    }
    const token = jwt.sign(
        {userId : user._id},
        process.env.JWT_SECRET,
        {expiresIn : '1d'}
    )
    res.status(200).cookie('token',token,cookiesOptions).json({
        message : "User Login sucessfully",
        success : true,
        user : {
            id : user._id,
            name : user.name,
            email : user.email
        }
    })
}


exports.Logout = async (req,res)=>{
    res.clearCookie('token')
    .status(200)
    .json({
        success : true,
        message : "Logged out"
    })
}


exports.getMe = async (req, res) => {
    try {
      
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};