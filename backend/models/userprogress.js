const mongoose = require('mongoose')

const userProgressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Problem',
        required:true
    },
    isSolved:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userProgressSchema.index(
    {user:1,problem:1},
    {unique:true}
)

const UserProgress = mongoose.model('UserProgress',userProgressSchema)
module.exports = UserProgress