import taskModel from "../models/task.model.js";

export const addTask = async (req , res) =>{

    try{
        const {title , description } = req.body;
        const task = await taskModel.create({title , description});
        res.status(200).json({task});
    }catch(error){
        res.status(500).json({
           message : error.message ,
           clg : "error in create task"
        });
    }

}
export const updateTask = async (req , res) => {
    try {
        const {id} = req.params;
        const {title , description} = req.body;
        const task = await taskModel.findByIdAndUpdate(id , {title , description} , {new : true});
        
        res.status(201).json({task  , msg : "task"});
    } catch (error) {
        console.log('Error in update task:', error); // log the error to the console
        res.status(500).json({
            message : error ,
            clg : "error in update task"
         });
    }
}
export const deleteTask = async (req , res) =>{
    try {
        const {id} = req.params;  
        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({
            message : error ,
            clg : "error in delete task"
         });
    }
}
export const getTask = async (req , res) =>{
    try {
        const task = await taskModel.find();
        res.status(200).json({task});
        
    } catch (error) {
        res.status(500).json({
            message : error ,
            clg : "error in create task"
         });
    }
}

export const deleteAll = async (req,res)=>{
        try {
            await taskModel.deleteMany();
            res.status(201).json({message : " All detele "})
        } catch (error) {
            console.log(" error all delelte " , error)
        }
}