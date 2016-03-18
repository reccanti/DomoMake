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
    
    
    /** 
     *  perform validation on the inputs
     */
    if (!req.body.username || !req.body.pass || !req.body.pass2) {
        return res.status(400).json({error: "RAWR! All fields are required"});
    }
    if (req.body.pass !== req.body.pass2) {
        return res.status(400).json({error: "RAWR! Passwords do not match"});
    }
    
    /**
     * Create a new account by generating a hash & salt value from the 
     * password, then save it to the database.
     */
    Account.AccountModel.generateHash(req.body.pass, function (salt, hash) {   
       var accountData = {
           username: req.body.username,
           salt: salt,
           password: hash
       };
       var newAccount = new Account.AccountModel(accountData);
       newAccount.save(function(err) {
          if (err) {
              console.error(error);
              return res.status(400).json({error: "an error occurred"});
          } 
          res.json({redirect: "/maker"});
       });
    });
};


module.exports.loginPage = loginPage;
module.exports.signupPage = signupPage;
module.exports.logout = logout;
module.exports.login = login;
module.exports.signup = signup;