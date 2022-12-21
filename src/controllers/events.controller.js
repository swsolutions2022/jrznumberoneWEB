const db = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');
const { SITE_HOST }  = require('../config');
const fs = require('fs');


const getDraftEvents = async (req, res) => {
    try {        
        let events = await db.eventversions.findAll({
        where: { 
            isActive: 0,
            sendForApproval: 0
        },
        include: [{
            model: db.eventversionfiles,
            as: 'files',
            required:false, 
            attributes: ['filename'],
        }],
       });
       if (events !== undefined && events.length > 0) 
       {
            for await (const event of events) {
                for await (const file of event.files) {
                    file.filename = `${SITE_HOST}/events/${file.filename}`;
                }
            }
       }
       res.status(200).json(events);
    } catch (error) {
        console.log(error)
        res.status(500).json([]);
    }
}
const getActiveEvents = async (req, res) => {
    try {        
        let events = await db.eventversions.findAll({
        where: { 
            isActive: 1,
            sendForApproval: 1,
            startDate:{
                [Op.lte]: moment().format('YYYY-MM-DD')
            },
            endDate:{
                [Op.gte]: moment().format('YYYY-MM-DD')
            },
        },
        include: [{
            model: db.eventversionfiles,
            as: 'files',
            required:false, 
            attributes: ['filename'],
        }],
       });
       if (events !== undefined && events.length > 0) 
       {
            for await (const event of events) {
                for await (const file of event.files) {
                    file.filename = `${SITE_HOST}/events/${file.filename}`;
                }
            }
       }
       res.status(200).json(events);
    } catch (error) {
        console.log(error)
        res.status(500).json([]);
    }
}
const getEventVersionsForApproval = async (req, res) => {
    try {        
        let events = await db.eventversions.findAll({
        where: { 
            isActive: 0,
            sendForApproval: 1
        },
        include: [{
            model: db.eventversionfiles,
            as: 'files',
            required:false, 
            attributes: ['filename'],
        }],
       });
       if (events !== undefined && events.length > 0) 
       {
            for await (const event of events) {
                for await (const file of event.files) {
                    file.filename = `${SITE_HOST}/events/${file.filename}`;
                }
            }
       }
       res.status(200).json(events);
    } catch (error) {
        console.log(error)
        res.status(500).json([]);
    }
}




const uploadEventImage = async (req, res) =>{
    try {
        let fileObj =  await db.eventversionfiles.create(
            {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                destination: req.file.destination,
                size: req.file.size,
                eventVersionId: req.body.eventVersionId
            }
            )        
        res.status(200).json({status:200,  message : "Ok"});
    } catch (error) {
        res.status(500).json({status:200,  message : "Ok"});
    }
}

const deleteEventImage = async (req, res) =>{
    try {
        let file = await db.eventversionfiles.findOne({ where: {eventVersionFileId : req.query.eventVersionFileId }});
        await fs.unlink(`${file.destination}/${file.filename}`);
        await db.eventversionfiles.destroy({ where: {eventVersionFileId : req.query.eventVersionFileId }})
        res.status(200).json({status:200,  message : "Ok"});
    } catch (error) {
        console.log(error)
        res.status(500).json({status:200,  message : "Ok"});
    }
}




const newEvent = async (req, res) => {
    
    let transaction = await db.sequelize.transaction();
    try {      
        if(req.body.title && req.body.startDate && req.body.endDate)
        {
            let newEvent = {
                title: req.body.title,
            };
            let insertedEvent = await db.events.create(newEvent, { transaction }); 
            let newVersionEvent = {
                title: req.body.title,
                description: req.body.description,
                schedule: req.body.schedule,
                isActive: false,
                startDate: moment(req.body.startDate, 'YYYY-MM-DD'),
                endDate: moment(req.body.endDate, 'YYYY-MM-DD'),
                eventId: insertedEvent.eventId,
                date: moment(req.body.date, 'YYYY-MM-DD'),
                address: req.body.address,
                linkTwitter: req.body.linkTwitter,
                linkYoutube:  req.body.linkYoutube,
                linkInstagram:  req.body.linkInstagram,
                linkFacebook:  req.body.linkFacebook,
                linkTiktok:  req.body.linkTiktok,
                sendForApproval: false
            }
            let insertedVersionEvent = await db.eventversions.create(newVersionEvent, { transaction });  
            let savedLog = await db.logs.create({ userId: req.userId, created : 1, referenceId: insertedVersionEvent.eventVersionId, model: "events" }, { transaction });
            await transaction.commit();
            res.status(200).json({status:200,  message : "Ok", id: insertedEvent.eventId, vid: insertedVersionEvent.eventVersionId });
        }
        else
        {
            await transaction.rollback();
            res.status(406).json({  status:406,  message : null, id: 0 });
        }
    } catch (error) {
        if(transaction)
        {
            await transaction.rollback();
        }
        res.status(500).json({ status:500,  message : error, id: 0 });
    }
}
const updateEventVersion = async (req, res) => {
    try {      
        if(req.body.title && req.body.startDate && req.body.endDate)
        {
            let objToUpdate = {
                title: req.body.title,
                description: req.body.description,
                schedule: req.body.schedule,
                isActive: false,
                startDate: moment(req.body.startDate, 'YYYY-MM-DD'),
                endDate: moment(req.body.endDate, 'YYYY-MM-DD'),
                date: moment(req.body.date, 'YYYY-MM-DD'),
                address: req.body.address,
                linkTwitter: req.body.linkTwitter,
                linkYoutube:  req.body.linkYoutube,
                linkInstagram:  req.body.linkInstagram,
                linkFacebook:  req.body.linkFacebook,
                linkTiktok:  req.body.linkTiktok,
                sendForApproval: req.body.sendForApproval
            }
            await db.eventversions.update(objToUpdate, { where: { eventVersionId : req.body.eventVersionId  } });  
            let savedLog = await db.logs.create({ userId: req.userId, updated : 1, referenceId: req.body.eventVersionId, model: "eventVersion" });         
            res.status(200).json({status:200,  message : "Ok",  eventVersionId: objToUpdate.eventVersionId });
        }
        else
        {
         
            res.status(406).json({  status:406,  message : null, id: 0 });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500,  message : error, id: 0 });
    }
}
const deleteEventVersion = async (req,res) => {
    let transaction = await db.sequelize.transaction();
    try {
        let eventversion = await db.eventversions.findOne({
            where: { 
                isActive: 0,
                eventVersionId: req.query.eventVersionId
            },
            include: [{
                model: db.eventversionfiles,
                as: 'files',
                required:false, 
                attributes: ['filename', 'destination','eventVersionFileId'],
            }],
           });
        
        if(eventversion != null)
        {
            try {
                let filesToDelete = [];
                eventversion.files.forEach(function(file){ 
                     fs.stat(`${file.destination}/${file.filename}`,function(err, stats) {
                        console.log(stats);//here we got all information of file in stats variable
                        if (err) {
                            return console.error(err);
                        }
                     
                        fs.unlink(`${file.destination}/${file.filename}`,function(err){
                             if(err) return console.log(err);
                             filesToDelete.push(file.eventVersionFileId);  
                             console.log(file.eventVersionFileId)
                        });  
                     }); 
                });

                // for(const file of eventversion.files) {
                //     fs.stat(`${file.destination}/${file.filename}`, function (err, stats) {
                //         console.log(stats);//here we got all information of file in stats variable
                //         if (err) {
                //             return console.error(err);
                //         }
                     
                //         fs.unlink(`${file.destination}/${file.filename}`,function(err){
                //              if(err) return console.log(err);
                //              filesToDelete.push(file.eventVersionFileId);  
                //              console.log(file.eventVersionFileId)
                //         });  
                //      });
                //     // fs.exists(`${file.destination}/${file.filename}`, (exist) => {
                //     //     if(exist)
                //     //     {
                //     //        fs.unlinkSync(`${file.destination}/${file.filename}`, (err) => {
                //     //         if (err) throw err;
                //     //         console.log(file.eventVersionFileId)
                           
                //     //       });              
                //     //     }                      
                //     //   });   
                // }
                console.log(filesToDelete)
                //   await db.eventversionfiles.destroy({ where: { eventVersionFileId: filesToDelete }}, { transaction })
                //   await db.eventversions.destroy({
                //     where:{
                //         eventVersionId: req.query.eventVersionId
                //     }
                // }, { transaction });
                await transaction.commit()
              }
              finally {
                ;
              }   
        }
        res.status(200).json({status:200,  message : "Ok"});
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        res.status(500).json({status:500,  message : error});
    }
    
} 

const eventVersionApproval = async (req,res) =>{
       let eventVersion = await db.eventversions.update(
        {
            isActive: req.body.Approval
        },
        {
        where:
        {
          eventVersionId: req.body.eventVersionId
        }
       });
       let savedLog = await db.logs.create({ userId: req.userId, updated : 1, referenceId: req.body.eventVersionId, model: "eventVersion", comments:req.body.comments, approved: req.body.Approval  });   
       res.status(200).json({status:200,  message : "Ok"});
}






module.exports = {
    getActiveEvents,
    getDraftEvents,
    getEventVersionsForApproval,
    newEvent,
    updateEventVersion,
    eventVersionApproval,
    deleteEventVersion,
    uploadEventImage,
    deleteEventImage
}
