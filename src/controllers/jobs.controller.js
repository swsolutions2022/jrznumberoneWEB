const db = require('../models');


const newJob = async (req, res) => {
    try {        
        
        res.send({ status: 200 });
    } catch (error) {

        res.send({ status: 500 });
    }
}






module.exports = {
    newJob
}