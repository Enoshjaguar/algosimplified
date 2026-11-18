
const UserProgress = require('../models/userprogress')
const Problem = require('../models/problem')

const updateProblemStatus = async (req, res) => {
    try {
        // Get problem ID from URL
        const problemId = req.params.problemId;

        // Get logged-in user ID from JWT middleware
        const userId = req.user.id;

        // Get solved status from request body
        const { isSolved } = req.body;

        // Validate isSolved
        if (typeof isSolved !== 'boolean') {
            return res.status(400).json({
                message: "isSolved must be true or false"
            });
        }

        // Check whether problem exists
        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        // Create or update user progress
        const progress = await UserProgress.findOneAndUpdate(
            {
                user: userId,
                problem: problemId
            },
            {
                $set: { isSolved: isSolved }
            },
            {
    returnDocument: 'after',
    upsert: true,
    runValidators: true
}
        );

        return res.status(200).json({
            message: isSolved
                ? "Problem marked as solved"
                : "Problem marked as unsolved",
            progress
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating problem status",
            error: error.message
        });
    }
};


const getUserProgress = async(req,res)=>{
    try{
        const userId = req.user.id
        const progress=  await UserProgress.find({
            user:userId
        })
        return res.status(200).json({
            message:"User progress fetched successfuly",
            progress
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Error fetching user progress",
            error: error.message
        });
    }
}


const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all solved problems with their problem details
        const solvedProgress = await UserProgress.find({
            user: userId,
            isSolved: true
        })
        .populate("problem")
        .sort({ updatedAt: -1 });

        // Remove records whose referenced problem no longer exists
        const validProgress = solvedProgress.filter(
            item => item.problem !== null
        );

        // Total problems in database
        const totalProblems = await Problem.countDocuments();

        // Total solved
        const problemsSolved = validProgress.length;

        // Total score
        const totalScore = validProgress.reduce(
            (total, item) => total + item.problem.score,
            0
        );

        // Difficulty breakdown
        const difficulty = {
            easy: 0,
            medium: 0,
            hard: 0
        };

        validProgress.forEach(item => {
            const level = item.problem.difficulty.toLowerCase();

            if (difficulty[level] !== undefined) {
                difficulty[level]++;
            }
        });

        // Completion percentage
        const completion = totalProblems > 0
            ? Math.round((problemsSolved / totalProblems) * 100)
            : 0;

        // Recent activity
        const recentActivity = validProgress
            .slice(0, 5)
            .map(item => ({
                title: item.problem.title,
                difficulty: item.problem.difficulty,
                score: item.problem.score,
                solvedAt: item.updatedAt
            }));

        return res.status(200).json({
            problemsSolved,
            totalScore,
            completion,
            difficulty,
            recentActivity
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching dashboard statistics",
            error: error.message
        });
    }
};


module.exports = { updateProblemStatus,getUserProgress, getDashboardStats };
