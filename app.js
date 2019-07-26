const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', function (req, res, next) {
    if (req.url === '/') {
        return res.status(200).send();
    } else {
        next();
    }
});

app.use('/api', function (req, res, next) {
    next();
});

app.use('/api/ping', routes.ping);
app.use('/api/test', routes.test);
app.use('/api/test2', routes.test2);
app.use('/api/test3', routes.test3);

// Error handler for API issues
app.use('/api', function (err, req, res, next) {

    console.log('API issue:', err);

    return res.status(500).send({
        status: 'ERROR',
        code: 1,
        message: String(err)
    });
});

// Start the server
var server = app.listen(5000, function () {
    var port = server.address().port;
    console.log(`App listening on port:${port}`);
    console.log('Press Ctrl+C to quit.');
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', err);
})

process.on('SIGINT', function () {
    process.exit(0);
    console.log('process.exit');
});

module.exports = app;