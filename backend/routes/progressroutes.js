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

module.exports = router;