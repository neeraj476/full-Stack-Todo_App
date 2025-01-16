import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const conenctDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        
    }
}