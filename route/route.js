const express = require('express')
const { getVendor, insertVendor } = require('../controller/vendors')
const { insertUser, loginUser, getInfoUser, getAllUser, updateUser } = require('../controller/controllerUser')
const { getDepartament, insertDepartment } = require('../controller/controllerDepartment')
const auth = require('../middleware/auth')
const { getAllReportComputer, saveReportComputer } = require('../controller/controllerFichaGeneral')
const { saveReportRed, getAllReportRed } = require('../controller/controllerFichaRed')
const router = express.Router()
//access to login and create user
router.post('/createUser', insertUser)
router.post('/loginUser', loginUser)
router.post('/updateUser', updateUser)
router.get('/getInfoUser', auth, getInfoUser)
router.get('/getAllUser', getAllUser)
// routers for crud proveedores
router.get('/getVendors', getVendor)
router.post('/insertVendors', insertVendor)
// routers for crud departtament
router.get('/getDepartament', getDepartament)
router.post('/insertdepartament', insertDepartment)
//routers for crud for reports
router.post('/getReport', getAllReportComputer)
router.post('/saveReport', saveReportComputer)
router.post('/saveReportRed', saveReportRed)
router.post('/getAllReportRed', getAllReportRed)





module.exports = router