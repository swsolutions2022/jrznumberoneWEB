const nodemailer = require('nodemailer');
const moment = require('moment');
const { EMAIL_SETTINGS, EMAIL_USER }  = require('../../config.js');
const db = require('../../models');
const ejs = require('ejs');
const path = require('path');

const GenerateTemplateAndSendEmail = async (to,subject,templateName,templateContent) =>{

    const html = await ejs.renderFile(path.join(__dirname, `/${templateName}.ejs`), templateContent, {async:true});
    await sendEmail(to,subject,html); 
}

const sendEmail = async (to,subject,html) =>{
    let transporter = nodemailer.createTransport(EMAIL_SETTINGS);      
    let mailOptions = {
        from: EMAIL_USER,
        to: to,
        subject: subject,
        html: html      
      };
      
    await transporter.sendMail(mailOptions).then(async ()=> {
      await db.emails.create(
        { 
          "to": to,
          "subject": subject,
          "html": html,
          "createdBy": 1,
          "itWasSent": true,
          "whenWasSent": moment()
        }
        )
       
    })
    .catch(async ()=> {
      await db.emails.create(
        { 
          "to": to,
          "subject": subject,
          "html": html,
          "createdBy": 1,
          "itWasSent": false,
        }
        )
      
    });;            
}




module.exports = {
    sendEmail,
    GenerateTemplateAndSendEmail
}