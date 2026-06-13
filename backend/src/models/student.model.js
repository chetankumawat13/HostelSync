const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    rollNumber:{
        type: String,
        required: [true, 'Roll number is required'],
        unique: [true, 'Roll number must be unique'],
        trim: true
    },
    course:{
        type: String,
        required: [true, 'Course is required'],
        trim: true
    },
    year:Number,
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        default: null
    },
    parentName:String,
    parentPhone:{
        type: String,
        trim: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    address:String,
    feesStatus:{
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    }
    
},{timestamps:true})


/**
 * Create a Mongoose model for the Student schema and export it for use in other parts of the application.
 */

const studentModel = mongoose.model('Student', studentSchema);


module.exports = studentModel;
