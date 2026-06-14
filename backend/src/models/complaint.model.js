const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student reference is required']
    },
    title:{
        type: String,
        required: [true, 'Complaint title is required'],
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Complaint description is required'],
        trim: true
    },
    status:{
        type: String,
        enum: ['pending', 'in-progress', 'resolved', 'rejected'],
        default: 'pending'
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    remarks:String,
    resolveAt:Date,
},{timestamps:true})


const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;