const express = require('express')
const { getVendor, insertVendor } = require('../controller/vendors')
const { insertUser, loginUser } = require('../controller/controllerUser')
const { getDepartament } = require('../controller/department')
const auth = require('../middleware/auth')
const { insertComponent, getComponent, getOneComponent } = require('../controller/components')
const { getGeneral } = require('../controller/general')
const { getUser } = require('../controller/user')
const { insertCtrolEquipk } = require('../controller/ctrolequipo')
const router = express.Router()
//access to login and create user
router.post('/createUser', insertUser)
router.post('/loginUser', loginUser)

// routers for crud proveedores
router.get('/getVendors', getVendor)
router.post('/insertVendors', insertVendor)

// routers for crud departtament
router.get('/getDepartament', getDepartament)

// routers for crud users
router.get('/getUser', getUser)


//routers for crud components
router.get('/getComponent', getComponent)
router.post('/insertCtrolequipo', insertCtrolEquipk)

//routers for crud components
router.post('/insertComponent', insertComponent)
router.get('/getOneComponent', getOneComponent)

//routers for crud
router.get('/getGeneral', getGeneral)






module.exports = router