const { Router } = require('express');
const router = Router();
const jobsController = require('../controllers/jobs.controller');


router.post('/newEvent', jobsController.newJob);

module.exports = router;


//StartDate
//EndDate
//IsActive
//Horario
//Detalles
//Titulo
//Link de la pagina
//Comentarios
