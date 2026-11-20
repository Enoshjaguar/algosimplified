const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })

const Problem = require('../models/problem')
const Problems = require('../data/dsaProblems')

const seedProblems = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
       const result = await Problem.insertMany(
    Problems.filter(problem => problem.topic === "Linked List")
);

console.log(`${result.length} Linked List problems inserted successfully`);
    }
    catch(error){
        console.log("Seeding error",error)
    }
    finally{
        await mongoose.disconnect()
    }
}
seedProblems()