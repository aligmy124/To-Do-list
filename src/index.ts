import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import taskRoutes from "./routes/tasksRoutes"
const app=express();
app.use(express.json());
// routes
app.use("/task", taskRoutes);
app.get("/",(req, res)=>{
    res.send("To-Do List")
})
app.use(errorHandler)
// port
const PORT=Number(process.env.PORT) || 3000;

const startServer=async()=>{
    try{
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`server start on port: http://localhost:${PORT}`)
        })
    }
    catch(error){
        console.error("failed error: ", error);
        process.exit(1)
    }
}
startServer();
