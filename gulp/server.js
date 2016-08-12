'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var jsonServer = require('json-server');

var util = require('util');

//var middleware = require('./proxy');

var proxy = require('proxy-middleware');
var url = require('url');

module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    // the base url where to forward the requests
    //var proxyOptions = url.parse('http://paris:8881/aiolws');
    //var proxyOptions = url.parse('http://paris:9014/aiolws');
    var proxyOptions = url.parse('http://localhost:3001');
    //var proxyOptions = url.parse('https://uat.assanteservices.com/aiolws');

    // Which route browserSync should forward to the gateway
    proxyOptions.route = '/';
    proxyOptions.rejectUnauthorized = false;

    var server = {
      baseDir: baseDir,
      routes: routes,
      middleware: [
          proxy(proxyOptions)
      ]
    };

    /*if(middleware.length > 0) {
      server.middleware = middleware;
    }*/




    browserSync.instance = browserSync.init({
      //startPath: '/#/en/aio/landing',
      server: server,
      browser: browser
      /*middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }*/
    });
  }

  gulp.task('JSON-Server', function () {
    var jsnServer = jsonServer.create();
    var jsnRouter = jsonServer.router('mockBackend.json');
    jsnServer.use(jsnRouter);
    jsnServer.listen(3001);
  });


  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  gulp.task('serve', ['JSON-Server','config:local','watch'], function () {
    browserSyncInit([options.tmp + '/serve', options.src]);
  });

  gulp.task('serve:dist', ['build:local'], function () {
    browserSyncInit(options.dist);
  });

  gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(options.dist, []);
  });
};
