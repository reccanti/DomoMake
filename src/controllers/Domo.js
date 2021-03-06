var _ = require("underscore");
var models = require("../models");
var Domo = models.Domo;


/**
 * This function renders the maker page
 */
var makerPage = function(req, res) {
    Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {
        if (err) {
           console.error(err);
           return res.status(400).json({error: "An error occurred"}); 
        }
        res.render('app', {csrfToken: req.csrfToken(), domos: docs});
    });
};


/**
 * This function creates a Domo object in the Database
 * The name and age are taken from the form, while the 
 * owner is based on the id held in the session cookie
 */
var makeDomo = function(req, res) {
    if (!req.body.name || !req.body.age) {
        return res.status(400).json({error: "RAWR! Both name and age are required"});
    }
    var domoData = {
        name: req.body.name,
        age: req.body.age,
        owner: req.session.account._id
    };
    var newDomo = Domo.DomoModel(domoData);
    newDomo.save(function(err) {
        if (err) {
            console.error(err);
            return res.status(400).json({error: "An error occurred"});
        }
        res.json({redirect:"/maker"});
    });
};


module.exports.makerPage = makerPage;
module.exports.make = makeDomo;