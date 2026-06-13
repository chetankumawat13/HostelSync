const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber : {
        type: String,
        required: [true, 'Room number is required'],
        unique: [true, 'Room number must be unique']
    },
    floor : {
        type: Number,
        required: [true, 'Floor number is required']
    },
    block:{
        type: String,
        required: [true, 'Block is required']
    },
    capacity : {
        type: Number,
        required: [true, 'Capacity is required']
    },
    occupants : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    status : {
        type: String,
        enum: ['available', 'occupied', 'maintenance'],
        default: 'available'
    },
    amenities : [{
        type: String
    }]


},{timestamps:true})



module.exports = mongoose.model('Room',roomSchema)
