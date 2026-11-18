const Problems = require('../models/problem')

const getallproblems = async(req,res)=>{
    try{
        const allproblems = await Problems.find({})
        if(allproblems.length===0){
            return res.status(400).json({message:"problems not found"})
        }
        return res.status(200).json({message:"All problems fetched successfully",problems:allproblems})
    }
    catch(err){
        return res.status(500).json({message:"error fetching all problems",error:err.message})


    }
}

const getproblemsbytopic = async (req, res) => {
    try {
        const topic = req.params.topic;

        const problemsontopic = await Problems.find({ topic: topic });

        if (problemsontopic.length === 0) {
            return res.status(404).json({
                message: "Problems not found"
            });
        }

        return res.status(200).json({
            message: "Problems fetched successfully",
            problems: problemsontopic
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error fetching problems by topic",
            error: err.message
        });
    }
};

const getproblemsbypattern =async(req,res)=>{
    try{
        const {topic, pattern} = req.params
        const problems = await Problems.find({
            topic:topic,
            pattern:pattern
        })
        if(problems.length===0){
            return res.status(404).json({
                message: "Problems not found"
            });

        }
        return res.status(200).json({
            message: "Problems fetched successfully",
            problems
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error fetching problems by patterns",
            error: err.message
        });
}
}

const getproblemsbydifficulty = async(req,res)=>{
    try{
        const difficulty = req.params.difficulty
        const problems = await Problems.find({difficulty:difficulty})
        if(problems.length===0){
            return res.status(404).json({
                message:"Problems not found"
            })
        }
        return res.status(200).json({
            message:"problems fetched",
            problems
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Error fetching problems by difficulty",
            error: err.message
        });
}
}

const getproblembyid = async(req,res)=>{
    try{
        const id = req.params.id
        const problem = await Problems.findById(id);
        if(!problem){
            return res.status(400).json({
                message:"Problems not found"
            })
        }
        return res.status(200).json({message:"Problem found",problem})
    }
    catch (err) {
        return res.status(500).json({
            message: "Error fetching problems by id",
            error: err.message
        });
}}

const getpatternbytopic = async(req,res)=>{
    try{
        const topic = req.params.topic
        if(!topic){
            return res.status(500).json({
                message:"No patterns found in this topic"
            })
        }
        const patterns = await Problems.distinct("pattern",{topic:topic})
        return res.status(200).json({message:"patterns in this topic found",patterns:patterns})

    }
    catch(err){
        return res.status(500).json({
            message:"error fetching patterns by topic",
            error:err.message
        })
    }
}

module.exports ={getallproblems,getproblemsbytopic,getproblemsbypattern,getproblemsbydifficulty,getproblembyid,getpatternbytopic}