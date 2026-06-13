const roomModel = require("../models/room.model")
const userModel = require("../models/user.model")




async function createRoomController(req,res){
    const {roomNumber,floor,block,capacity,amenities} = req.body

    const existingRoom = await roomModel.findOne({roomNumber})

    if(existingRoom){
        return res.status(400).json({
            message:'Room number already exists'
        })
    }

    const room = await roomModel.create({
        roomNumber,
        floor,
        block,
        capacity,
        amenities
    })

    res.status(201).json({
        message:'Room created successfully',
        room
    })

}

async function getAllRoomsController(req,res){
    const rooms = await roomModel.find()
    res.status(200).json({
        message:'Rooms fetched successfully',
        rooms
    })
}

async function assignStudentToRoom(req,res){
    const id = req.params.id
    const {studentId} = req.body

    const room = await roomModel.findById(id)
    if(!room){
        return res.status(404).json({
            message:'Room not found'
        })
    }

    const student = await userModel.findById(studentId)
    if(!student || student.role !== 'student'){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    if(room.occupants.length >= room.capacity){
        return res.status(400).json({
            message:'Room is already full'
        })
    }

    room.occupants.push(studentId)

    if(room.occupants.length === room.capacity){
        room.status = 'occupied'
    }

    await room.save()

    res.status(200).json({
        message:'Student assigned to room successfully',
        room
    })


}

async function removeStudentFromRoom(req,res){
    const id = req.params.id
    const {studentId} = req.body

    const room = await roomModel.findById(id)
    if(!room){
        return res.status(404).json({
            message:'Room not found'
        })
    }

    const student = await userModel.findById(studentId)
    if(!student || student.role !== 'student'){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    const index = room.occupants.indexOf(studentId)
    if(index === -1){
        return res.status(400).json({
            message:'Student is not assigned to this room'
        })
    }

    room.occupants.splice(index,1)

    if(room.occupants.length < room.capacity){
        room.status = 'available'
    }

    await room.save()

    res.status(200).json({
        message:'Student removed from room successfully',
        room
    })

}

async function updateRoomController(req,res){
    const id = req.params.id
    const {roomNumber,floor,block,capacity,amenities} = req.body

    const room = await roomModel.findById(id)
    if(!room){
        return res.status(404).json({
            message:'Room not found'
        })
    }

    room.roomNumber = roomNumber || room.roomNumber
    room.floor = floor || room.floor
    room.block = block || room.block
    room.capacity = capacity || room.capacity
    room.amenities = amenities || room.amenities

    await room.save()

    res.status(200).json({
        message:'Room updated successfully',
        room
    })
}

module.exports = {
    createRoomController,getAllRoomsController,assignStudentToRoom,removeStudentFromRoom,updateRoomController
}