import { ErrorHandler } from '../middlewares/error.js';
import {Task} from '../models/task.js'
// create task
export const newTask = async (req,res) => {
    const {title,description} = req.body;
    
    const task = await Task.create({    
        title,
        description,
        user : req.user
    });

    return res.status(201).json({
        success : true,
        message : "Task created successfully !",
    })

}
// get task
export const getMyTask = async (req,res) => {
    const userid = req.user._id;
    
    const alltask = await Task.find({
      user: userid,
    });

    return res.status(200).json({
        success : true,
        alltask
    })

}

// update
export const updateTask = async (req,res,next) => {
    const {id} =  req.params;
    const task = await Task.findById(id);
    if (!task) {
        return next(new ErrorHandler("Task Not Found", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success : true,
        message : "Task Completed !"
    })

}
// delete
export const deleteTask = async (req, res,next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if(!task) {
    return next(new ErrorHandler('Task Not Found' , 404))
  }
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted !",
  });
};