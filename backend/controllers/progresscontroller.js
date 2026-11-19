
const UserProgress = require('../models/userprogress')
const Problem = require('../models/problem')
const User = require('../models/usersignup')

const getTodayDate = () => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date());
};

const getDateDifference = (previousDate, currentDate) => {
    const previous = new Date(`${previousDate}T00:00:00Z`);
    const current = new Date(`${currentDate}T00:00:00Z`);

    return Math.round(
        (current - previous) / (1000 * 60 * 60 * 24)
    );
};

const updateProblemStatus = async (req, res) => {
    try {
        const problemId = req.params.problemId;
        const userId = req.user.id;
        const { isSolved } = req.body;

        if (typeof isSolved !== 'boolean') {
            return res.status(400).json({
                message: "isSolved must be true or false"
            });
        }

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        // Update problem progress
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

        // Update streak only when marking as solved
        if (isSolved) {
            const user = await User.findById(userId);
            console.log("STREAK UPDATE STARTED");

console.log("USER FOUND:", user ? user.name : "Not found");
console.log("TODAY:", getTodayDate());
console.log("CURRENT STREAK:", user?.currentStreak);

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const today = getTodayDate();

            const currentStreak = user.currentStreak || 0;
            const longestStreak = user.longestStreak || 0;

            if (!user.lastSolvedDate) {
                user.currentStreak = 1;
            } else {
                const difference = getDateDifference(
                    user.lastSolvedDate,
                    today
                );

                if (difference === 1) {
                    user.currentStreak = currentStreak + 1;
                } else if (difference > 1) {
                    user.currentStreak = 1;
                }
            }

            user.longestStreak = Math.max(
                longestStreak,
                user.currentStreak
            );

            user.lastSolvedDate = today;

            await user.save();
        }

        return res.status(200).json({
            message: isSolved
                ? "Problem marked as solved"
                : "Problem marked as unsolved",
            progress
        });

    } catch (error) {
        console.error("Streak update error:", error);

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
