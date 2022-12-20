module.exports = (sequelize, DataTypes) => {
    const eventversionfiles = sequelize.define('eventversionfiles',{
        eventVersionFileId:{
            type: DataTypes.INTEGER,      
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        filename: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        path: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        mimetype: {
            type: DataTypes.STRING, 
            allowNull:false 
        },  
        destination: {
            type: DataTypes.STRING, 
            allowNull:false 
        },  
        size: {
            type: DataTypes.INTEGER, 
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
        eventVersionId:{
            type: DataTypes.INTEGER,      
            allowNull:false,
        }
    })
    
    return eventversionfiles;
}