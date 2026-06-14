const leaveRequestModel = require("../models/leave.model")
const studentModel = require("../models/student.model")



async function createLeaveController(req,res){
    const {reason,startDate,endDate,destination,contactDuringLeave} = req.body

    const student = await studentModel.findOne({userId:req.user.id})

    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    const leave = await leaveRequestModel.create({
        student:student._id,
        reason,
        startDate,
        endDate,
        destination,
        contactDuringLeave,
        status:'pending'
    })

    res.status(201).json({
        message:'Leave request created successfully',
        leave
    })
}

async function getMyLeavesController(req,res){
    const student = await studentModel.findOne({userId:req.user.id})

    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    const leaves = await leaveRequestModel.find({student:student._id}).sort({createdAt:-1})

    res.status(200).json({
        message:'Leave requests fetched successfully',
        leaves
    })
}



async function getAllLeavesController(req,res){
    const leaves = await leaveRequestModel.find().populate('student','rollNumber course year').sort({createdAt:-1})

    res.status(200).json({
        message:'Leave requests fetched successfully',
        leaves
    })
}


async function approveLeaveController(req,res){
    const id = req.params.id

    const leave = await leaveRequestModel.findById(id)

    if(!leave){
        return res.status(404).json({
            message:'Leave request not found'
        })
    }

    leave.status = 'approved'
    await leave.save()

    res.status(200).json({
        message:'Leave request approved successfully',
        leave
    })
}


async function rejectLeaveController(req,res){
    const id = req.params.id

    const leave = await leaveRequestModel.findById(id)

    if(!leave){
        return res.status(404).json({
            message:'Leave request not found'
        })
    }

    leave.status = 'rejected'
    await leave.save()

    res.status(200).json({
        message:'Leave request rejected successfully',
        leave
    })
}





module.exports = {
    createLeaveController,getMyLeavesController,getAllLeavesController,approveLeaveController,rejectLeaveController 
}