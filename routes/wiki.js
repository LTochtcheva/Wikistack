var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/',function(req,res){
  res.send("Hello");
})

router.get('/add/',function(req,res){
  res.render('addpage');
})

router.post('/',function(req,res){
  var title = req.body.title;
  var page = Page.build({
    title: title,
    urlTitle: title.split(" ").join("_"),
    content: req.body.content
  });
  console.log(page.urlTitle);
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  // page.save();
  res.redirect('/wiki');
})

module.exports = router;
