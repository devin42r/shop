/**
 * Created by devin on 4/5/17.
 */


var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    date: String,
    image: String,
    location: String,
    item: String,
    price: {type: Number, default: 0},
});

mongoose.model('Item', ItemSchema)
