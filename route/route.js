const express = require('express')
const { getVendor, insertVendor } = require('../controller/vendors')
const { insertUser, loginUser, getInfoUser, getAllUser } = require('../controller/controllerUser')
const { getDepartament, insertDepartment } = require('../controller/controllerDepartment')
const auth = require('../middleware/auth')
const { getGeneral, insertGeneral } = require('../controller/controllerFichaGeneral')
const { saveReportRed } = require('../controller/controllerRed')
const router = express.Router()
//access to login and create user
router.post('/createUser', insertUser)
router.post('/loginUser', loginUser)
//FIXME: CAMBIO A GET ESTA RUTA
router.post('/getInfoUser', auth ,getInfoUser)
router.get('/getAllUser', getAllUser)
// routers for crud proveedores
router.get('/getVendors', getVendor)
router.post('/insertVendors', insertVendor)
// routers for crud departtament
router.get('/getDepartament', getDepartament)
router.post('/insertdepartament', insertDepartment)
//routers for crud for reports
router.post('/getReport', getGeneral)
router.post('/saveReport', insertGeneral)
router.post('/saveReportRed', saveReportRed)





module.exports = router