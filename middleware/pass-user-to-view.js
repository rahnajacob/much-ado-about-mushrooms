const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
  }
  
  //EXPORT
  module.exports = passUserToView;