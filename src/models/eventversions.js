
module.exports = (sequelize, DataTypes) => {
    const eventversions = sequelize.define('eventversions',{
        eventVersionId:{
            type:DataTypes.INTEGER,      
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        title: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        description: {
            type: DataTypes.STRING, 
            allowNull:true 
        }, 
        schedule: {
            type: DataTypes.STRING, 
            allowNull:false 
        },
        isActive: {
            type: DataTypes.BOOLEAN, 
            allowNull:false 
        },
        startDate: {
            type: DataTypes.DATE, 
            allowNull:false 
        },
        endDate: {
            type: DataTypes.DATE, 
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
        eventId: {
            type: DataTypes.INTEGER, 
            allowNull:false 
        },
        date: {
            type: DataTypes.DATE, 
            allowNull:false 
        },
        address: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        linkTwitter: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        linkYoutube: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        linkInstagram: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        linkFacebook: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        linkTiktok: {
            type: DataTypes.STRING, 
            allowNull:true 
        },
        sendForApproval: {
            type: DataTypes.BOOLEAN, 
            allowNull:false 
        },
        })
        return eventversions;
    }