const db = require('../models');

const getUserToSerealizeOrDeserealize = async (email, userId) =>
{
    let sessionUser = null;
    let passwordFromDb = null;
    let whereClause = null;
  
    if(email != undefined || email != null)
    {
        whereClause = { email: email, isActive: 1 }
    }
    else if(userId != undefined || userId != null)
    {
        whereClause = { userId: userId, isActive: 1 }
    }
    if(whereClause != null)
    {
        try {
       
            let userFromDb = await db.users.findOne(
                {            
                    where: whereClause,
                    include: [{
                        where: { isActive: 1},
                        model: db.roles,
                        as: 'role',
                        required:false,
                        include:[
                            {
                                where: { isActive: 1, view: 1},
                                model: db.roleRoutes,
                                as: 'roleRoute',
                                required:false,
                                order: [
                                    ['name', 'ASC'],
                                ],                        
                                include:[
                                    {
                                        where: { isActive: 1},
                                        model: db.routes,
                                        as: 'route',
                                        required:false,                        
                                        order: [
                                            ['name', 'ASC'],
                                        ]
                                    }
                                ],                        
                                order: [
                                    ['name', 'ASC'],
                                ]
                            },
                            {
                                where: { isActive: 1},
                                model: db.roleCompanies,
                                as: 'roleCompanies',
                                required:false,
                                            
                            }
                        ]                    
                    }],    
                });  
                console.log(userFromDb)
                console.log(whereClause)
                if(userFromDb == null)
                {
                    return { passwordFromDb:null,sessionUser: null } 
                }
                passwordFromDb = userFromDb.password;
                let access =[];
                if(userFromDb.role != undefined &&  userFromDb.role.roleRoute)
                {
                    userFromDb.role.roleRoute.forEach(element => {
                        access.push({ 
                            "route": element.route.route, 
                            "name": element.route.name, 
                            "view": element.view, 
                            "add": element.add,
                            "edit": element.edit,
                            "delete": element.delete,
                            "moreOptionsRoute":  element.route.moreOptionsRoute,
                            "addRoute": element.route.addRoute
    
                        });
                    });
                }
                let companies = new Array();
                if(!userFromDb.role.allCompanies)
                {
                    userFromDb.role.roleCompanies.forEach(element => {
                        companies.push(element.companyId)
                    });
                }
                console.log(userFromDb)
                let companiesAccess = { allCompanies: userFromDb.role.allCompanies, companies };
                sessionUser  = { userId: userFromDb.userId, email: userFromDb.email, firstName: userFromDb.firstName, lastName: userFromDb.lastName, access, companiesAccess };
        } catch (error) {
            console.log(error)
        }
        
    }
    return { passwordFromDb, sessionUser } 
        
}

module.exports = {
    getUserToSerealizeOrDeserealize

}