const studentModel = require('../models/student.model');
const complaintModel = require('../models/complaint.model');



async function createComplaintController(req,res){
    const {title,description} = req.body

    const student = await studentModel.findOne({userId:req.user.id})

    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    const complaint = await complaintModel.create({
        student:student._id,
        title,
        description,
        status:'pending'
    })

    res.status(201).json({
        message:'Complaint created successfully',
        complaint
    })
}


async function getMyComplaintsController(req,res){
    const student = await studentModel.findOne({userId:req.user.id})

    if(!student){
        return res.status(404).json({
            message:'Student not found'
        })
    }

    const complaints = await complaintModel.find({student:student._id}).sort({createdAt:-1})

    res.status(200).json({
        message:'Complaints fetched successfully',
        complaints
    })
}


async function getAllComplaintsController(req,res){
    const complaints = await complaintModel.find().populate('student','rollNumber course year').sort({createdAt:-1})

    res.status(200).json({
        message:'Complaints fetched successfully',
        complaints
    })
}


async function updateComplaintStatusController(req,res){
    const {status,remarks} = req.body
    const id = req.params.id

    const complaint = await complaintModel.findById(id)

    if(!complaint){
        return res.status(404).json({
            message:'Complaint not found'
        })
    }

    complaint.status = status ?? complaint.status

    if(remarks){
        complaint.remarks = complaint.remarks ? [...complaint.remarks,remarks] : [remarks]
    }

    await complaint.save()

    res.status(200).json({
        message:'Complaint status updated successfully',
        complaint
    })
}


async function assignComplaintsController(req,res){
    const {staffId} = req.body

    const complaints = await complaintModel.find({_id:{$in:complaintIds}})

    if(!complaints){
        return res.status(404).json({
            message:'Complaints not found'
        })
    }

    complaints.assignTo = staffId
    complaints.status = 'in-progress'

    await Promise.all(complaints.map(complaint=>complaint.save()))

    res.status(200).json({
        message:'Complaints assigned successfully',
        complaints
    })
}


module.exports = {
    createComplaintController,
    getMyComplaintsController,
    getAllComplaintsController,
    updateComplaintStatusController,
    assignComplaintsController
}