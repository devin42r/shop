var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var mongoose = require('mongoose');
// var Comment = mongoose.model('Comment');
var Item = mongoose.model('Item');

router.get('/Items', function(req, res, next) {
    Item.find(function(err, items){
        if(err){ return next(err); }
        res.json(items);
    });
});

router.post('/items', function(req, res, next) {
    var item = new Item(req.body);
    item.save(function(err, item){
        if(err){ return next(err); }
        res.json(item);
    });
});

router.param('item', function(req, res, next, id) {
    var query = Item.findById(id);
    query.exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { return next(new Error("can't find item")); }
        req.item = item;
        return next();
    });
});

router.get('/items/:item', function(req, res) {
    res.json(req.item);
});

router.put('/items/:item/upvote', function(req, res, next) {
    req.item.upvote(function(err, item){
        if (err) { return next(err); }
        res.json(item);
    });
});

router.delete('/items/:item', function(req, res) {
    console.log("in Delete");
    req.item.remove();
    res.json(req.item);
});

module.exports = router;
