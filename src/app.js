var path = require("path");
var express = require("express");
var compression = require("compression");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


/**
 * Connect to the Database using mongoose. Throw an error if a 
 * connection error occurred.
 */
var dbURL = process.env.MONGOLAB_URI || "mongodb://localhost/DomoMaker";
var db = mongoose.connect(dbURL, function(err) {
    if (err) {
        console.log("Could not connect to the database");
        throw err;
    }
});


/**
 * Pull in all of our routes
 */
var router = require("./router");


/**
 * Set the port that our app will be served on
 */
var port = process.env.PORT || process.env.NODE_PORT || 3000;


/**
 * Set up the Express server
 */
var app = express();
app.use("/assets", express.static(path.resolve(__dirname + "/../../client/")));
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname + "/views"));
app.use(favicon(path.resolve(__dirname + "/../client/img/favicon.png")));
app.use(cookieParser());

router(app);

app.listen(port, function(err) {
   if (err) {
       console.log("Could not connect to port " + port);
       throw err;
   }
   console.log("listening on port " + port);
});