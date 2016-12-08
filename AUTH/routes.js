var crypto = require('crypto');
var express = require('express');
var mongoose = require('mongoose');
module.exports = function(app) {
  var users = require('./controllers/users_controller');

var Car = mongoose.model('Car');
   
app.get('/cars', function(req, res, next) {
     
  Car.find(function(err, cars){
    if(err){ return next(err); }
    res.json(cars);
  });
});

app.post('/cars', function(req, res, next) {
  var car = new Car(req.body);
  car.save(function(err, car){
    if(err){ return next(err); }
    res.json(car);
  });
});

app.param('carid', function(req, res, next, id) {
  var query = Car.findById(id);
  query.exec(function (err, car){
    if (err) { return next(err); }
    if (!car) { return next(new Error("no car")); }
    req.car = car;
    return next();
  });
});

app.get('/cars/:carid', function(req, res) {
  res.json(req.car);
});
app.delete('/cars/:carid', function(req, res) {
req.car.remove();
  res.json();
});


app.get('/delete', function(req, res){
//console.log("in delete");
 Car.remove(function(err, removed){
  
  });
res.sendStatus(200);
});


app.put('/cars/:carid/upvote', function(req, res, next) {
//
  req.car.upvote(function(err, car){ 
    if (err) { return next(err); }
    res.json(car);
  });
});
app.put('/cars/:carid/downvote', function(req, res, next) {
  req.car.downvote(function(err, car){
    if (err) { return next(err); }
    res.json(car);
  });
});


  app.use('/static', express.static( './static')).
      use('/lib', express.static( '../lib')
  );
  app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/user', function(req, res){
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/signup', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
  });
  app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
  });

  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
  app.post('/signup', users.signup);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  app.get('/user/profile', users.getUserProfile);
}
