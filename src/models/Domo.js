var mongoose = require("mongoose");
var _ = require("underscore");

var DomoModel;


/**
 * Given a name, format the string for HTML and remove any
 * excess spaces
 */
var setName = function(name) {
    return _.escape(name).trim();
};


/**
 * Defines the Schema of a Domo object. 
 * 
 * The 'name' property uses the setName() function to transform
 * the data before putting it into the database. 
 * 
 * The 'owner' property is set to be an object of a mongoose
 * Schema type. It uses the 'Account' Schema as a reference.
 */
var DomoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    age: {
        type: Number,
        min: 0,
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});


/**
 * This function returns information from a Domo document
 * as a JSON that can be more easily interacted with
 */
DomoSchema.methods.toAPI = function() {
    return {
        name: this.name,
        age: this.age
    };
};


/**
 * This function searches for all the Domo documents that 
 * belong to a particular owner. The owner is referenced by
 * their ID in the database. It returns only the name and age
 * of the Domo object and then executes a callback if 
 * specified.
 */
DomoSchema.statics.findByOwner = function(ownerId, callback) {
    var search = {
        owner: mongoose.Types.objectId(ownerId)
    };
    return DomoModel.find(search).select("name age").exec(callback);
};


/**
 * This creates the model of the Domo object based on the schema we
 * created.
 */
DomoModel = mongoose.model("Domo", DomoSchema);


module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;