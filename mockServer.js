var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('mockBackend.json');
var fs = require('fs');
var _ = require('lodash');
var data = JSON.parse(fs.readFileSync('mockBackend.json', 'utf8'));
var middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/advisors', function (req, res) {
    res.jsonp(data.advisors);
});
server.get('/advisors/:id', function (req, res) {
    //convert id into int, all get params are strings
    var id = +req.params.id;
    var index = _.findIndex(data.advisor, function(o) { return o.id === id; });
    if (index >= 0) {
        res.jsonp(data.advisor[index]);
    } else {
        res.jsonp({});
    }

});
// Add custom routes before JSON Server router
server.get('/branches', function (req, res) {
    res.jsonp(data.branches);
});
server.get('/branches/:id', function (req, res) {
    //convert id into int, all get params are strings
    var id = +req.params.id;
    var index = _.findIndex(data.branch, function(o) { return o.id === id; });
    if (index >= 0) {
        res.jsonp(data.branch[index]);
    } else {
        res.jsonp({});
    }

});

server.use(function (req, res, next) {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
//server.use(router)
server.listen(3001, function () {
    console.log('JSON Server is running')
})