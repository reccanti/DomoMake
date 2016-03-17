var _ = require("underscore");
var models = require("../models");


/**
 * This function renders the maker page
 */
var makerPage = function(req, res) {
    res.render('app');
};

module.exports.makerPage = makerPage;