const { GenerateTemplateAndSendEmail  } = require('../utils/emails/email');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const helpers = require('../utils/helpers')
const db = require('../models');
const { SITE_HOST, SITE_NAME, SECRETKEY } = require('../config.js')

//validar que no haya otro usuario con el mail
const signup = async (req, res) => {
    try {        
        let encryptedPassword = await helpers.encryptPassword(req.body.password1);
        let newUser = 
        {
            "firstName": req.body.userFirstName,
            "lastName": req.body.userLastName,
            "isActive": false,
            "email": req.body.email,
            "password":encryptedPassword,
            "phoneNumber": req.body.phoneNumber,
            "roleId": 1,
            "lastPasswordUpdate": moment(),
            "emailValidation": false    

        };
        let user = await db.users.create(newUser);
        await GenerateTemplateAndSendEmail(req.body.email,`${SITE_NAME}|Activar cuenta.`,"activateAccount",
        { 
            "HiMessage": `Hola ${req.body.userFirstName}!`,
            "Message": `${SITE_NAME}|Activar cuenta.`,
            "Link": `${SITE_HOST}activateAccount/?id=${user.userId}`,
            "LinkMessage": `Clic aqui para activar la cuenta!`,
            "ExtraMessage": "",
            "footerMsg": ""
        }
        )
        res.status(200).json({ message : 'OK' })
    } catch (error) {
        res.status(500).json({ message : error })
    }
}

//verificar si existe otro token activo
const signin = async (req, res) => {
    try {        
        console.log(req.body)
        if(req.body.email && req.body.password)
        {
            let user = await db.users.findOne({ where:{
                email: req.body.email,
                isActive: true
            }});
            if (!user) {
                return res.status(400).json({ message: "User Not Found" });
            } 
            let matchResult  = await helpers.matchPassword(req.body.password,user.password);
            console.log(matchResult)
            if(!matchResult)
            {
                return res.status(401).json({
                    token: null,
                    message: "Invalid Password",
                  });
            }

            const token = jwt.sign({ id: user.userId }, SECRETKEY, {
                expiresIn: 86400, // 24 hours
              });
              return res.status(200).json({ message : null, token: token });
        }
        else
        {
            return res.status(400).json({ message : "User Not Found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message : error })
    }
}

module.exports = {
    signup,
    signin
}