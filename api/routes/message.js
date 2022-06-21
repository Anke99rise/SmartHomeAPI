const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/messageController')


router.get('/:device_id',MessageController.getMessages)
router.post('/',MessageController.createMessage)
router.put('/',MessageController.changeMessage)



module.exports = router

