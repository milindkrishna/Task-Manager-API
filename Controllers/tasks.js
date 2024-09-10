const TaskSchema = require('../Models/TaskSchema')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await TaskSchema.find({})
    res.status(200).json({success: true, task : {tasks, nbHits: tasks.length}}) 
})

const createTask = asyncWrapper(async (req, res) => {
    
    const tasks = await TaskSchema.create(req.body)
    res.status(201).json({success: true,task :{tasks}})
    
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
   
    const {id: taskID} = req.params
    const task = await TaskSchema.findOne({_id: taskID})
    if(!task){
        return res.status(404).json({errorMessage : `No task with id : ${taskID}`})
    }
    res.status(200).json({task :task})
})

const updateTask = asyncWrapper(async (req, res) => {
        const {id: taskID} = req.params
        const task = await TaskSchema.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })
        if(!task){
            return res.status(404).json({errorMessage : `No task with id : ${taskID}`})
        }
        res.status(200).json({task : task, status: 'success'})
    }
)
const deleteTask = asyncWrapper(async (req, res) => {
    
        const {id: taskID} = req.params
        const task = await TaskSchema.findOneAndDelete({_id: taskID})
        if(!task){
            return res.status(404).json({errorMessage : `No task with id : ${taskID}`})
        }
        // const tasks = await TaskSchema.find({})
        // res.status(200).json({ tasks: tasks }); // Return the undeleted tasks
        res.status(200).json({task :task, status: 'success'})
    
})

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}