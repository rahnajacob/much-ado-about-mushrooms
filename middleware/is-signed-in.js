//CHECKS FOR AUTH
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next()
        res.redirect("/auth/sign-in")
}

//EXPORTS
module.exports = isSignedIn