const express = require('express')
const router = express.Router()
const DeviceController = require('../controllers/deviceController')



router.get('/',DeviceController.getDevices)
router.post('/',DeviceController.createDevice)
router.put('/updateDevice',DeviceController.changeDevice)

module.exports = router