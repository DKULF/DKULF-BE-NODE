const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    tags : [ { type : String } ],
    status : Boolean,
    createdAt : String,
    image : String,
});

module.exports = mongoose.model('Item',ItemSchema);