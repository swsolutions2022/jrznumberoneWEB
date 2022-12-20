const {Sequelize, DataTypes, Transaction } = require('sequelize');
const {  DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT  } = require('../config.js')



const sequelize = new Sequelize(
    DB_DATABASE,
    DB_USER, 
    DB_PASSWORD,
    {
      host: DB_HOST,
      dialect: 'mysql',
      operatorAliases: false,
      pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000,
      },
      logging: false,
      dialectOptions: { // for reading
        timezone: '-06:00',
      },
      timezone: '-06:00', // for writing to database
});


sequelize.authenticate()
.then(()=> console.log("Database connected"))
.catch(error => console.log(`Error: ${error}`));



const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.emails = require('./emails')(sequelize, DataTypes)
db.users = require('./users')(sequelize, DataTypes)
db.roles = require('./roles')(sequelize, DataTypes)
db.eventversions = require('./eventversions')(sequelize, DataTypes)
db.events = require('./events')(sequelize, DataTypes)
db.logs = require('./logs')(sequelize, DataTypes)
db.eventversionfiles = require('./eventversionfiles')(sequelize, DataTypes)


db.sequelize.sync({ force: false  })
.then(() => {
    console.log('yes re-sync done!')
})


db.users.hasMany(db.logs,{
  foreignKey: 'userId',
  as: 'logs'
});

db.logs.belongsTo(db.users,{
  foreignKey: 'userId',
  as: 'user'
});


db.roles.hasMany(db.users,{
  foreignKey: 'roleId',
  as: 'user'
});

db.users.belongsTo(db.roles,{
  foreignKey: 'roleId',
  as: 'role'
});

db.events.hasMany(db.eventversions,{
  foreignKey: 'eventId',
  as: 'eventversions'
});

db.eventversions.belongsTo(db.events,{
  foreignKey: 'eventId',
  as: 'event'
});


db.eventversions.hasMany(db.eventversionfiles,{
  foreignKey: 'eventVersionId',
  as: 'files'
});

db.eventversionfiles.belongsTo(db.eventversions,{
  foreignKey: 'eventVersionId',
  as: 'eventversion'
});


module.exports = db