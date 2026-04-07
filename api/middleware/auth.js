module.exports = function(req, res, next){ // notice the "next" parameter - this is important for middleware functions, it allows us to pass control to the next middleware or route handler in the stack

    //simple auth middleware to check if user is logged in (ie - if we have a userId in the session)
  if(!req.session.userId){
    return res.status(401).json({
      error: "Not authenticated"
    })
  }

  next() // If we reach this point, the user is authenticated, so we can proceed to the next middleware or route handler
}