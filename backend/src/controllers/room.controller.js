const roomModel = require("../models/room.model")




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

module.exports = {
    createRoomController,getAllRoomsController
}