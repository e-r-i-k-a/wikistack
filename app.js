const express = require ('express');
const app = express();
const morgan = require ('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require ('body-parser');
const models = require ('./models');
const router = require ('./routes');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');  // have res.render work with html files
app.engine('html', nunjucks.render);  // when res.render works with html files, have it use nunjucks to do so

//logging middleware:
app.use(morgan('dev'));

//route
app.use(router);

//body parsing middleware:
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);

//staticly serve:
app.use(express.static('public'));

//sync

models.User.sync({})
.then(function() {
    return models.Page.sync({})
})
.then (function() {
    app.listen(3000, function () {
        console.log('server is listening on port 3000');
    });
})
.catch(console.error);