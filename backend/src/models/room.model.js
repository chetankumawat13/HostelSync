const mongoose = require('mongoose');

/**
 * Define the Room schema for the hostel management system.
 */

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



const roomModel = mongoose.model('Room', roomSchema);

module.exports = roomModel;
