var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/',function(req,res){
  Page.findAll({}).then(function(pages){
    res.render('index', { pages: pages })
  })
})

router.get('/add/',function(req,res){
  res.render('addpage');
});

router.get('/:urlTitle',function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then(function(foundPage){
    res.render('wikipage', { foundPage: foundPage } )
  })
  .catch(next);
});

router.post('/',function(req,res, next){
  console.log(req.body);

User.findOrCreate({
  where: {
    name: req.body.author,
    email: req.body.email
  }
})
.then(function (values) {

  var user = values[0];

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  return page.save().then(function (page) {
  return page.setAuthor(user);
  });
})
.then(function (page) {
  res.redirect(page.getRoute);
})
.catch(next);

})

module.exports = router;
