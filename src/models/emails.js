module.exports = (sequelize, DataTypes) => {
    const emails = sequelize.define('emails',{
        emailId:{
            type: DataTypes.INTEGER,      
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        to: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        subject: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        html: {
            type: DataTypes.STRING, 
            allowNull:false 
        },  
        createdBy: {
            type: DataTypes.INTEGER, 
            allowNull:false 
        },  
        createdAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        itWasSent: {
            type: DataTypes.BOOLEAN, 
            allowNull:true 
        },
        whenWasSent: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        cc: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
    })
    
    return emails;
}