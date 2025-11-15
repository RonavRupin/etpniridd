import express from "express"
import UserRoutes from './routes/authRoutes.js'
import moodRoutes from './routes/moodRoutes.js' //
import studyRoutes from './routes/studyRoutes.js' //
import dbconnection from "./database/connection.js"
import cors from 'cors'
const app=express()
app.listen(process.env.PORT,()=>{
    console.log("server is running on port 5000")
})

app.use(express.json())

app.use(cors())


app.use('/user',UserRoutes)
app.use('/api/moods', moodRoutes) //
app.use('/api/study', studyRoutes) // 