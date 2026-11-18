const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    pattern:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    
    },
    platform:{
        type:String,
        enum:['LeetCode','GFG'],
        required:true
    },
    problemLink:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:['Easy','Medium','Hard'],
        required:true
    },
    score:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Problem', problemSchema)