const studentModel = require("../models/student.model")


async function getAllStudentController(req,res){
        const students = await studentModel.find().populate('userId','username email phone').populate('room')
        res.status(200).json({
            message:'Students fetched successfully',
            students
        })
}

async function getStudentByIdController(req,res){
    const id = req.params.id
    const student = await studentModel.findById(id).populate('userId','username email phone').populate('room')
    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }
    res.status(200).json({
        message:'Student fetched successfully',
        student
    })
}

async function updateStudentController(req,res){
    const id = req.params.id
    const student = await studentModel.findById(id)
    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }
    const {course,year,parentName,parentPhone,address,feesStatus} = req.body

    student.course = course ?? student.course
    student.year = year ?? student.year
    student.parentName = parentName ?? student.parentName
    student.parentPhone = parentPhone ?? student.parentPhone
    student.address = address ?? student.address
    student.feesStatus = feesStatus ?? student.feesStatus

    await student.save()

    res.status(200).json({
        message:'Student updated successfully',
        student
    })

}

async function getAssignedRoomController(req,res){
    const id = req.params.id
    const student = await studentModel.findById(id).populate('room')
    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }
    res.status(200).json({
        message:'Assigned room fetched successfully',
        room:student.room
    })
}

module.exports = {
    getAllStudentController,getStudentByIdController,updateStudentController,getAssignedRoomController
}