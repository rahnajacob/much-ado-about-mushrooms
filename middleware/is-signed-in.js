//CHECKS FOR AUTH
const isSignedIn = (req, res, next) => {
    if (req.session.user || req.method === "GET") return next()
        res.redirect("/auth/sign-in")
}

//EXPORTS
module.exports = isSignedIn