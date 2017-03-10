var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var routes;
var fs = require('fs');
var bodyParser = require('body-parser');

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});
// will need to change path from views...

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/somePath')));
//will need to change path...

app.use('/', routes);

