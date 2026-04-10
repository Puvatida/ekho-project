function roleMiddleware(requiredRole) {
    return (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json(
                { 
                    error: "Not authenticated"
                })
            }
        
        if (req.session.user.role !== requiredRole) {
            return res.status(403).json(
                { 
                    error: "Forbidden" 
                })
            }
            
            next(); 
        
        };
}
module.exports = roleMiddleware;