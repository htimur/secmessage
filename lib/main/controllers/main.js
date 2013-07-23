var util = require('util');

exports = module.exports;

exports.index = function (req, res) {

    var context = {
        title: "SecMessage",
        welcome_message: 'test'
    }

    res.render('index/index', context);
};

exports.template = function (req, res) {
    var templateName = req.params.name;

    var context = {
        title: "SecMessage"
    }

    if(templateName) {
        res.render('index/' + templateName, context);
    } else {
        res.redirect('/error');
    }
}

exports.error = function (req, res) {
    res.status(404);
    res.render('index/error', {
        title: 'SecMessage - an error occured'
    });
}