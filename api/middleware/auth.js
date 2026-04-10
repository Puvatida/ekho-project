module.exports = function(req, res, next){ 

  //middlewear auth check for user when loggedin 
  if(!req.session.userId){
    return res.status(401).json({
      error: "Not authenticated"
    })
  }

  next() 
}
module.exports = authMiddleware;