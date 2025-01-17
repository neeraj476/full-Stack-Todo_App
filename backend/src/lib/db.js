import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const conenctDB = async ()=>{
    try {
        console.log(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("dataBase connected");
    } catch (error) {
        console.log("error in dataBase connection" , error);
    }
}

export default conenctDB;