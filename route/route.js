const express = require('express')
const { getVendor, insertVendor } = require('../controller/vendors')
const { insertUser, loginUser, getInfoUser } = require('../controller/controllerUser')
const { getDepartament } = require('../controller/department')
const auth = require('../middleware/auth')
const { getGeneral, insertGeneral } = require('../controller/general')
const { getUser } = require('../controller/user')
const router = express.Router()
//access to login and create user
router.post('/createUser', insertUser)
router.post('/loginUser', loginUser)
router.post('/getInfoUser', auth ,getInfoUser)
// routers for crud proveedores
router.get('/getVendors', getVendor)
router.post('/insertVendors', insertVendor)
// routers for crud departtament
router.get('/getDepartament', getDepartament)
// routers for crud users
router.get('/getUser', getUser)
//routers for crud for reports
router.post('/getReport', getGeneral)
router.post('/saveReport', insertGeneral)






module.exports = router