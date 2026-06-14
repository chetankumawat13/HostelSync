
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student reference is required']
    },
    visitorName:{
        type: String,
        required: [true, 'Visitor name is required'],
        trim: true
    },
    visitorPhone:{
        type: String,
        trim: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
    },
    relationship:String,
    purpose:{
        type: String,
        required: [true, 'Purpose of visit is required'],
        trim: true
    },
    visitDate:{
        type: Date,
        required: [true, 'Visit date is required']
    },
    expectedCheckInTime:{
        type: String,
        required: [true, 'Expected check-in time is required'],
        trim: true
    },
    expectedCheckOutTime:{
        type: String,
        required: [true, 'Expected check-out time is required'],
        trim: true
    },
    actualCheckInTime:String,
    actualCheckOutTime:String,
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    gatePassCode:{
        type: String,
        unique: true,
        sparse: true
    },
    approvedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },


},{timestamps:true})


const visitorModel = mongoose.model('Visitor', visitorSchema);

module.exports = visitorModel;