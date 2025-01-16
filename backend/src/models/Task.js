import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    tittle : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    }

})  

export default mongoose.model("Task", TaskSchema)