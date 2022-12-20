
module.exports = (sequelize, DataTypes) => {

    const events = sequelize.define('events',{
        eventId:{
            type:DataTypes.INTEGER,      
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        title: {
            type: DataTypes.STRING, 
            allowNull:false 
        },        
        createdAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        updatedAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        })
        return events;
    }