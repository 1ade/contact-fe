// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-12-15 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/components/jquery/dist/jquery.js',
      'app/components/angular/angular.js',
      'app/components/bootstrap/dist/js/bootstrap.js',
      'app/components/angular-animate/angular-animate.js',
      'app/components/angular-cookies/angular-cookies.js',
      'app/components/angular-resource/angular-resource.js',
      'app/components/angular-route/angular-route.js',
      'app/components/angular-sanitize/angular-sanitize.js',
      'app/components/angular-touch/angular-touch.js',
      'app/components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/components/ng-img-crop/compile/minified/ng-img-crop.js',
      'app/components/holderjs/holder.js',
      'app/components/angular-flash-alert/dist/angular-flash.js',
      'app/components/angular-mocks/angular-mocks.js',
      // endbower
	  'app/components/angular-bootstrap/ui-bootstrap.js', // Add this line
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js",
	  'app/scripts/directives/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],
	
	// generate js files from html templates
    preprocessors: {
      'app/scripts/directives/*.html': ['ng-html2js'],
    },
	ngHtml2JsPreprocessor: {
		stripPrefix: 'app/',
		moduleName : 'templates'
	},
    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
	  "karma-ng-html2js-preprocessor"
	  ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
