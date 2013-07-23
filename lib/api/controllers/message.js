var util = require('util');

var Message = require('../models/message'),
    Mail = require('../models/email');

exports = module.exports;

exports.delete = function (req, res) {

    Message.delete(req.params.id, function (err) {
        if (err) {
            res.json({
                'error': 'error'
            });
            return;
        }

        res.json({
            'id' :  req.params.id
        });
    });
}

exports.view = function (req, res) {
    Message.load(req.params.id, function (err, data) {
        if (err) {
            res.json({
                'error': 'Your message wasn\'t found'
            });
            return;
        }

        res.json({
            id: req.params.id,
            message: data.message
        });
    });
}

exports.save = function (req, res) {
    if (req.body.message && req.body.email) {
        util.log('creating new message for: ' + req.body.email);

        Message.create(req.body, function (err, data) {
            var email = new Mail(data, req.body.email, req);

            email.send(function (err) {
                if (err) {
                    util.error(err, 'unknow error');
                    res.json({
                        'error': 'unknow error'
                    });
                    return;
                }

                req.session.messageId = data.id;
                res.json({
                    'id': data.id
                });
            });
        });

        return;
    }

    res.json({
        'error': 'error'
    });
}