const Problem = require('../models/problem')
const problemcontroller = require('../controllers/problemcontroller')
const express = require('express')
const router = express.Router()

router.get('/getallproblems',problemcontroller.getallproblems)
router.get('/getproblembytopic/:topic', problemcontroller.getproblemsbytopic);
router.get('/getproblemsbypattern/:topic/:pattern',problemcontroller.getproblemsbypattern)
router.get('/getproblemsbydifficulty/:difficulty',problemcontroller.getproblemsbydifficulty)
router.get('/getproblembyid/:id', problemcontroller.getproblembyid);
router.get('/getpatternbytopic/:topic',problemcontroller.getpatternbytopic)
module.exports = router;