module.exports = (sequelize, DataTypes) => {

    const roles = sequelize.define('roles',{
        roleId:{
            type: DataTypes.INTEGER,      
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        name: {
             type: DataTypes.STRING, 
             allowNull:false 
        },     
        description: {
            type: DataTypes.STRING, 
            allowNull:false 
       },   
        isActive: {
            type: DataTypes.BOOLEAN, 
            allowNull:false 
        },        
        createdAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        updatedAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        }
    })
    
    return roles;
    }
    
    