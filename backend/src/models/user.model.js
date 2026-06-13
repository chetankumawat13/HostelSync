const mongoose = require('mongoose');

/**
 * Define a Mongoose schema for the User model, which includes fields for username, email, password, createdAt, role, profilePhoto, phone, and isVerified. Each field has specific validation rules and default values where applicable.
 */
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:[true,'Username must be unique'],
        trim:true,
        minlength:[3,'Username must be at least 3 characters long'],
        maxlength:[30,'Username must be at most 30 characters long'],
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email must be unique'],
        trim:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,'Please provide a valid email address'],
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password must be at least 6 characters long'],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    role:{
        type:String,
        enum:['student','warden','admin'],
        default:'student',
    },
    profilePhoto:{
        type:String,
        default:'https://ik.imagekit.io/ad6av31ld/blank-profile-picture-973460_640.webp?updatedAt=1770787184788'
    },
    phone:{
        type:String,
        trim:true,
        match:[/^\d{10}$/,'Please provide a valid 10-digit phone number'],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },


},
{
    timestamps:true,
}
)

/**
 * Create a Mongoose model for the User schema and export it for use in other parts of the application.
 */

const userModel = mongoose.model('Users',userSchema)

module.exports = userModel;