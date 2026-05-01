import Task from "../models/Task.model.js";

export const createTask = async(req, res)=>{
  try {
    const {title, description} = req.body;
    const ctasks = await Task.create({
      title,
      description,
      user: req.user._id,
    })
    res.status(201).json(ctasks)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getTasks = async(req, res)=>{
  try {
    const gtasks = await Task.find({user: req.user._id})
    res.status(200).json(gtasks)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const updateTask = async(req, res)=>{
  try {
    const utasks = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    )
    res.status(200).json(utasks)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const deleteTasks = async(req, res)=>{
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Task deleted successfully"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}