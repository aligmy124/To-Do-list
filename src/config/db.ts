import mongoose from "mongoose"
export const connectDB=async()=>{
    const mongoURI=process.env.MONGO_URI;
    if(!mongoURI){
        throw new Error("MONGO_URI is not found");
    }
    try{
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected successfully");
    }
    catch(error){
        console.error("❌ MongoDB connection failed:", error);
        throw error
    }
}