const express = require('express')
const { insertCompany, getCompany } = require('../controller/company')
const { insertUser, loginUser } = require('../controller/controllerUser')
const { insertDepartament } = require('../controller/department')
const auth = require('../middleware/auth')
const router = express.Router()
//access to login and create user
router.post('/save', insertUser)
router.post('/login', loginUser)

// routers for crud companies
router.get('/getCompanies', getCompany)
router.post('/insertCompany', insertCompany)

// routers for crud departtament
router.post('/saveDepartament', insertDepartament)

module.exports = router