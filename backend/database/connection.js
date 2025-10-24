//this is the database connection code for mongodb
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
//this is the connection part
const dbconnection=mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("database connected")
})

.catch((err)=>{
    console.log("database connection failed ", err)
})

export default dbconnection;