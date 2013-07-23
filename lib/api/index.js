// Third-party libraries
var _ = require('underscore')
    , CONF = require('config')
    , express = require('express')
    , app = exports = module.exports = express()

// Don't just use, but also export in case another module needs to use these as well.
exports.callbacks = require('./controllers/message');

//-- You could also serve templates with local paths, but using shared layouts and partials may become tricky
var hbs = require('hbs');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);


// Module's Routes

//Message rest resource routs
app.delete('/api/message/:id', exports.callbacks.delete);
app.get('/api/message/:id', exports.callbacks.view);
app.post('/api/message', exports.callbacks.save);