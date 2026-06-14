const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student reference is required']
    },
    reason:{
        type: String,
        required: [true, 'Reason for leave is required'],
        trim: true
    },
    startDate:{
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate:{
        type: Date,
        required: [true, 'End date is required']
    },
    destination:String,
    contactDuringLeave:String,
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    remarks:String,
    reviewedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }

},{timestamps:true})


const leaveRequestModel = mongoose.model('LeaveRequest', leaveRequestSchema);


module.exports = leaveRequestModel;