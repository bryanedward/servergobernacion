const express = require('express')
const { getVendor, insertVendor } = require('../controller/vendors')
const { insertUser, loginUser } = require('../controller/controllerUser')
const { insertDepartament } = require('../controller/department')
const auth = require('../middleware/auth')
const { insertComponent, getComponent } = require('../controller/components')
const { getGeneral } = require('../controller/general')
const router = express.Router()
//access to login and create user
router.post('/createUser', insertUser)
router.post('/loginUser', loginUser)

// routers for crud companies
router.get('/getVendors', getVendor)
router.post('/insertVendors', insertVendor)

// routers for crud departtament
router.post('/saveDepartament', insertDepartament)


//routers for crud components
router.get('/getComponent', getComponent)
router.post('/insertComponent', insertComponent)

//routers for crud components
router.get('/getGeneral', getGeneral)


module.exports = router