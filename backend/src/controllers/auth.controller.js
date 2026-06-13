const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



async function registerController(req,res){
    const {username,email,password,role,profilePhoto,phone,isVerified} = req.body;

    const isUserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserExist){
        return res.status(400).json({
            message:'Username or email already exists',
        })
    }

    const passwordHash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:passwordHash,
        role,
        profilePhoto,
        phone,
        isVerified
    })

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'7d'
        }
    )

    res.cookie('token',token)

    return res.status(201).json({
        message:'User registered successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            profilePhoto:user.profilePhoto,
            phone:user.phone,
            isVerified:user.isVerified
        }
    })




}

async function loginController(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:'Invalid credentials',
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message:'Invalid credentials',
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'7d'
        }
    )

    res.cookie('token',token)

    res.status(200).json({
        message:'User logged in successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            profilePhoto:user.profilePhoto,
            phone:user.phone,
            isVerified:user.isVerified
        }
    })



    

    
}




module.exports = {
    registerController,loginController
}