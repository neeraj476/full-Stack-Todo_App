import express from "express";
import dotenv from "dotenv"
import cors from "cors";

dotenv.config();
connectDB();

import connectDB from "./lib/db.js";
import taskRouter from "./router/task.router.js";

const app = express();
app.use(cors(
    {
        origin : "*"
    }
));
app.use(express.json());
app.use("/api/tasks" , taskRouter);

const port = process.env.PORT || 4000;
app.listen(port , () =>{
    console.log("server is running at port" , port);
})
