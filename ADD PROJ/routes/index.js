var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
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

router.param('carid', function(req, res, next, id) {
  var query = Car.findById(id);
  query.exec(function (err, car){
    if (err) { return next(err); }
    if (!car) { return next(new Error("no car")); }
    req.car = car;
    return next();
  });
});

router.get('/cars/:carid', function(req, res) {
  res.json(req.car);
});
router.delete('/cars/:carid', function(req, res) {
	req.car.remove();
  res.json();
});


router.get('/delete', function(req, res){
	//console.log("in delete");
	 Car.remove(function(err, removed){
	  
  });
	res.sendStatus(200);
});


router.put('/cars/:carid/upvote', function(req, res, next) {
			//
  req.car.upvote(function(err, car){ 
    if (err) { return next(err); }
    res.json(car);
  });
});
router.put('/cars/:carid/downvote', function(req, res, next) {
  req.car.downvote(function(err, car){
    if (err) { return next(err); }
    res.json(car);
  });
});
module.exports = router;
