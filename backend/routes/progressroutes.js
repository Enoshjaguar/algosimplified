const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const progressController = require('../controllers/progresscontroller')

router.patch(
    '/:problemId',
    authMiddleware,
    progressController.updateProblemStatus
);

router.get('/',authMiddleware,progressController.getUserProgress)

router.get(
    '/dashboard-stats',
    authMiddleware,
    progressController.getDashboardStats
);


router.get(
    '/activity-heatmap',
    authMiddleware,
    progressController.getActivityHeatmap
);

router.get(
    '/leaderboard',
    authMiddleware,
    progressController.getLeaderboard
);

module.exports = router;