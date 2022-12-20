
module.exports = (sequelize, DataTypes) => {

    const logs = sequelize.define('logs',{
        logId:{
            type:DataTypes.INTEGER,      
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        userId: {
            type: DataTypes.INTEGER, 
            allowNull:false 
        },
        created: {
            type: DataTypes.BOOLEAN, 
            allowNull:true 
        },
        updated: {
            type: DataTypes.BOOLEAN, 
            allowNull:true 
        }, 
        deleted: {
            type: DataTypes.BOOLEAN, 
            allowNull:true 
        },
        sent: {
            type: DataTypes.BOOLEAN, 
            allowNull:true 
        },
        approved: {
            type: DataTypes.BOOLEAN, 
            allowNull:true 
        },
        createdAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        updatedAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        model: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        comments: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        referenceId:{
            type: DataTypes.INTEGER,     
            allowNull:false,
        },
        })
        return logs;
    }