/**
 * If the User tries to get to a page that requires them
 * to be logged in (and they are not logged in) redirect
 * them to the root page.
 */
var requiresLogin = function(req, res, next) {
    console.log("logged in");
    if (!req.session.account) {
        return res.redirect("/");
    }
    next();
};


/**
 * If the User is already logged in, redirect them to the
 * main app. 
 */
var requiresLogout = function(req, res, next) {
    console.log("logged out");
    if (req.session.account) {
        return res.redirect("/maker");
    }
    next();
};


/**
 * This function redirects to the url using HTTPS if it isn't already
 * using it.
 */
var requiresSecure = function(req, res, next) {
    console.log("is secure");
    if (req.headers["x-forwarded-proto"] != "https") {
        return res.redirect("https://" + req.hostname + req.url);
    }
    next();
};


/**
 * This function will bypass security and just go to the
 * next page
 */
var bypassSecurity = function(req, res, next) {
    console.log("bypassing security");
    next();
};


module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;
if (process.env.NODE_ENV === "production") {
    module.exports.requiresSecure = requiresSecure;
} else {
    module.exports.requiresSecure = bypassSecurity;
}