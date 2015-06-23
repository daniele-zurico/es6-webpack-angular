module.exports = function(config) {

    var path = require('path');
    var webpackConfig = require('./karma.webpack.config.js');

    var preProcessors = ['webpack'],
        reporters = ['spec'];
    if (process.env['IDE_COVERAGE']) {
        preProcessors.push('coverage');
    } else {
        reporters.push('coverage');
    }

    var preProcess = {};
    var scan = './app/**/*test/*index.js';

    preProcess[scan] = preProcessors;

    config.set(
    {
        basePath: '',
        frameworks: ['jasmine-jquery', 'jasmine'],
        browsers: ['PhantomJS2', 'Chrome'],
        reporters: reporters,
        colors: true,
        files: [
            './bower_components/angular/angular.min.js',
            './bower_components/angular-mocks/angular-mocks.js',
            scan
        ],

        preprocessors: preProcess,

        coverageReporter: {
            dir: 'target/coverage',
            reporters: [
                {
                    type: 'html'
                },
                {
                    type: 'text-summary'
                }
            ]
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            'karma-coverage',
            'istanbul-instrumenter-loader',
            'karma-webpack',
            'karma-jasmine-ajax',
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-phantomjs2-launcher',
            'karma-spec-reporter',
            'karma-chrome-launcher'
        ],

        port: 9878,
        reportSlowerThan: 500,
        captureTimeout: 20000,
        logLevel: config.LOG_DEBUG,
        singleRun: false
    });
};