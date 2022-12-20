const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cors = require("cors");
const helmet = require("helmet");
const { PORT, DB } = require('./config.js')


app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


app.use(
  cors({
    origin: 'http://127.0.0.1:3000' ,
     credentials :  true,  
     methods: 'GET,PUT,POST,OPTIONS', 
     allowedHeaders: 'Content-Type,Authorization' 
  })
);

console.log(DB)
app.use(express.json());
app.set('json spaces',2);

app.use(helmet());
app.use('/',require('./routes/index'));
app.use('/api/auth/',require('./routes/auth.routes'));
app.use('/api/jobs/',require('./routes/jobs.routes'));
app.use('/api/events/',require('./routes/events.routes'));


//middlewares



app.use('/views', express.static(path.resolve(__dirname, './views')));
app.use('/events', express.static(path.resolve(__dirname, '../upload/events')));
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });