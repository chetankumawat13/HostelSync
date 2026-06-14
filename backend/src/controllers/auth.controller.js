const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const redis = require("../config/cache");
const studentModel = require("../models/student.model");




async function registerController(req, res) {
    try {

        const {
            username,
            email,
            password,
            role,
            profilePhoto,
            phone,

            // Student fields
            rollNumber,
            course,
            year,
            parentName,
            parentPhone,
            address

        } = req.body;

        const isUserExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }


            const isRollExist = await studentModel.findOne({
                rollNumber
            });

            if (isRollExist) {
                return res.status(400).json({
                    success: false,
                    message: 'Roll number already exists'
                });
            }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: passwordHash,
            role,
            profilePhoto,
            phone
        });

        let student = null;


            student = await studentModel.create({
                userId: user._id,
                rollNumber,
                course,
                year,
                parentName,
                ParentPhone: parentPhone,
                address
            });


        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profilePhoto: user.profilePhoto,
                phone: user.phone
            },
            student
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

async function loginController(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    const role = user ? user.role : null
    let student = null

    if(role === 'student'){
        student = await studentModel.findOne({userId:user._id})
    }

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
        },
        student:student?{
            rollNumber:student.rollNumber,
            course:student.course,
            year:student.year,
            parentName:student.parentName,
            parentPhone:student.ParentPhone,
            address:student.address
        }:null
    })





    

    
}

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)

    if(!user){
        return res.status(404).json({
            message:'User not found',
        })
    }
    let student = null

    if(user.role === 'student'){
        student = await studentModel.findOne({userId:user._id}).populate('room')
    }

    res.status(200).json({
        message:'User fetched successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            profilePhoto:user.profilePhoto,
            phone:user.phone,
            isVerified:user.isVerified
        },
        student:student?{
            rollNumber:student.rollNumber,
            course:student.course,
            year:student.year,
            parentName:student.parentName,
            parentPhone:student.ParentPhone,
            address:student.address,
            room:student.room
        }:null
    })

}

async function logOutController(req,res){
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:'No token found',
            })
        }
        res.clearCookie('token')

        await redis.set(token,Date.now().toString());

        return res.status(200).json({
            message:'User logged out successfully',
        })

    }catch(error){
        return res.status(500).json({
            message:'Internal server error',
        })
    }
}




module.exports = {
    registerController,loginController,getMeController,logOutController
}