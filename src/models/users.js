
module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define('users',{
        userId:{
            type:DataTypes.INTEGER,      
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        firstName: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        lastName: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        isActive: {
            type: DataTypes.BOOLEAN, 
            allowNull:false 
        },
        email: {
             type: DataTypes.STRING, 
             allowNull:false 
        },
        password: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        phoneNumber: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        roleId: {
            type: DataTypes.INTEGER, 
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
        lastPasswordUpdate: {
            type: DataTypes.DATE, 
            allowNull:false 
        },
        emailValidation: {
            type: DataTypes.BOOLEAN, 
            allowNull:false 
        },
        emailValidationAt: {
            type: DataTypes.DATE, 
            allowNull:true 
        },
        })
        return users;
    }