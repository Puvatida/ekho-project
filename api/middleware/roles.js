function roleMiddleware(requiredRole) {
    //use for admin only; after user authentication with auth when login
    return (req, res, next) => {
        if (!req.session.userId) { //if user not login retun this error mssg
            return res.status(401).json(
                { 
                    error: "Not authenticated"
                })
            }
        //if the role does not match the required role
        if (req.session.userId.role !== requiredRole) { 
            return res.status(403).json(
                { 
                    error: "Forbidden" 
                })
            }
            
            next(); 
        
        };
}
module.exports = roleMiddleware;
