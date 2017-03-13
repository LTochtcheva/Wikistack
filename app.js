var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var wikiRouter = require('./routes/wiki');
var chalk = require('chalk');
var fs = require('fs');
var bodyParser = require('body-parser');

var env = nunjucks.configure('views', {noCache: true});
// will need to change path from views...

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

var models = require('./models');

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log(chalk.magenta('Server is listening on port 3000!'));
    });
})
.catch(console.error);

// app.use(express.static(path.join(__dirname, '/somePath')));
//will need to change path...

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/wiki', wikiRouter);

app.use('*', function(req,res){
  res.status(404).send('Nothing found');
})



