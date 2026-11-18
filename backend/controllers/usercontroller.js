const User = require('../models/usersignup')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const signup =async(req,res)=>{
try{
    const {name,mobile, password} = req.body

    if(!name || !mobile || !password){
        return res.status(400).json({
            message:"all fields are requiered"
        })
    }
    const existinguser = await User.findOne({mobile})
    if(existinguser){
        console.log("user already exists")
        return res.status(409).json({message:"user already exists"})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
        name,mobile,password:hashedpassword
    })
    console.log("user registerd successfully")
    res.status(201).json({message:"user registered successfully",user:{
        id:newUser._id,
        name:newUser.name,
        mobile:newUser.mobile
    }})
}
catch(err){
    res.status(500).json({message:"error in signup",err})
}
    
}

const login = async(req,res)=>{
    try{
        const {mobile,password}=req.body
        const user =await User.findOne({mobile})
        if(!user){
            return res.status(400).json({message:"please sign up"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Mobile number or passeword"
            })
        }
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )
        return res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                mobile:user.mobile
            }
        })

    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}

module.exports={signup,login}