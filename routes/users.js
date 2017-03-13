var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/',function(req,res,next){
  User.findAll({}).then(function(users){
    res.render('users', { users: users })
  })
  .catch(next);
});

router.get('/:userId', function(req, res, next) {

  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('userpage', { user: user, pages: pages });
  })
  .catch(next);

});

// router.get('/:id',function(req,res,next){
//   console.log("User id", req.params)
//   User.findOne({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(users){
//     res.render('userpage', { users: users })
//   })
//   // .catch(next);
// });

module.exports = router;
