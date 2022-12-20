const { Router } = require('express');
const router = Router();
const db = require('../models');
const { sendEmail  } = require('../utils/emails/email');

router.get('/', async (req,res) =>{
    try {
        res.render('index.html');
    } catch (error) {
        res.json(error);
    }
   
});



module.exports = router;