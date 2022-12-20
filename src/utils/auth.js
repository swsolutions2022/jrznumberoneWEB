module.exports = {
    isLoggedIn(req,res,next){
        if(req.isAuthenticated())
        {
            return next();
        }
        else
        {
            res.redirect('/signin');
        }
    },
    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated())
        {
            return next();
        }
        else
        {
            res.redirect('/');
        }
    },
    GetLoggedUser(req)
    {
        if(req.session != null && req.session != undefined)
        {
            if(req.session.passport != null && req.session.passport != undefined)
            {
                if(req.session.passport.user != null && req.session.passport.user != undefined)
                {
                    return req.session.passport.user;
                }
                else
                    return 0;
            }
            else
                return 0;
        }
        else
            return 0;
    }
}