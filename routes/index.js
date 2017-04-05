var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var mongoose = require('mongoose');
// var Comment = mongoose.model('Comment');
var Car = mongoose.model('Car');

router.get('/cars', function(req, res, next) {
    Car.find(function(err, cars){
        if(err){ return next(err); }
        res.json(cars);
    });
});

router.post('/cars', function(req, res, next) {
    var car = new Car(req.body);
    car.save(function(err, car){
        if(err){ return next(err); }
        res.json(car);
    });
});

router.param('car', function(req, res, next, id) {
    var query = Car.findById(id);
    query.exec(function (err, car){
        if (err) { return next(err); }
        if (!car) { return next(new Error("can't find car")); }
        req.car = car;
        return next();
    });
});

router.get('/cars/:car', function(req, res) {
    res.json(req.car);
});

router.put('/cars/:car/upvote', function(req, res, next) {
    req.car.upvote(function(err, car){
        if (err) { return next(err); }
        res.json(car);
    });
});

router.delete('/cars/:car', function(req, res) {
    console.log("in Delete");
    req.car.remove();
    res.json(req.car);
});

module.exports = router;
