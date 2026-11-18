const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require('./config/db')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors()  )
const userroutes = require('./routes/userroutes')
const problemroutes = require('./routes/problemsroutes')
const progressRoutes = require('./routes/progressroutes')
const port = process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.status(200).json({message:"backend is running"})
})
app.use('/api/users',userroutes)
app.use('/problems',problemroutes)
app.use('/progress',progressRoutes)
const startServer = async()=>{
    await connectDB()
    app.listen((port),()=>{
    console.log("app is listening")
})
}

startServer()