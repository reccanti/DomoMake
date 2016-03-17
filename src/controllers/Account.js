var models = require("../models");
var Account = models.Account;


/**
 * This function renders the login page view
 */
var loginPage = function (req, res) {
    res.render("login");
};


/**
 * This function renders the signup page view
 */
var signupPage = function (req, res) {
    res.render("signup");
};


/**
 * This function logs the user out of the system
 * by redirecting them to the root.
 */
var logout = function(req, res) {
    res.redirect("/");
};


/**
 * This function logs the User into the system
 */
var login = function(req, res) {
    
};


/**
 * This function signs the User into the system
 */
var signup = function(req, res) {
    
};


module.exports.loginPage = loginPage;
module.exports.signupPage = signupPage;
module.exports.logout = logout;
module.exports.login = login;
module.exports.signup = signup;