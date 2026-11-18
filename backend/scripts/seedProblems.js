const mongoose = require('mongoose')
require('dotenv').config()

const Problem = require('../models/problem')
const Problems = require('../data/dsaProblems')

const seedProblems = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
        await Problem.insertMany(Problems)
        console.log("problems inserted successfully")
    }
    catch(error){
        console.log("Seeding error",error)
    }
    finally{
        await mongoose.disconnect()
    }
}
seedProblems()