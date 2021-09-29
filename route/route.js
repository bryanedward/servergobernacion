const express = require('express')
const { insertUser, loginUser } = require('../controller/controller')
const auth = require('../middleware/auth')
const router = express.Router()
router.post('/save', insertUser)
router.post('/login', auth, loginUser)


module.exports = router