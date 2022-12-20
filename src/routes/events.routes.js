const { Router } = require('express');
const router = Router();
const eventsController = require('../controllers/events.controller');
const  { verifyToken } = require("../middlewares/authJwt.js")
const multer = require('multer');

const path = require("path");
const storage = multer.diskStorage({
    destination: './upload/events',
    filename: (req, file, cb) =>{
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage
})

router.post('/newEvent', verifyToken ,eventsController.newEvent);
router.put('/updateEventVersion', verifyToken ,eventsController.updateEventVersion);
router.get('/getActiveEvents', eventsController.getActiveEvents);
router.post('/uploadEventImage', verifyToken,upload.single('profile'), eventsController.uploadEventImage);
router.delete('/deleteEventImage', verifyToken, eventsController.deleteEventImage);
router.put('/eventVersionApproval', verifyToken ,eventsController.eventVersionApproval);
router.delete('/deleteEventVersion', verifyToken ,eventsController.deleteEventVersion);

module.exports = router;