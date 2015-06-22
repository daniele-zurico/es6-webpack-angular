var path = require('path');
var webpack = require('webpack');
var ComponentResolverPlugin = require('component-resolver-webpack');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var bowerComponentsPath = path.join(__dirname, 'bower_components');
var vendorPath = path.join(__dirname, 'app/vendor');

module.exports = {
    resolveLoader: {
        root: nodeModulesPath
    },

    entry: {
        app: ['./index.js'],
        vendor: [
            'angular',
            'angular-ui-router',
            'angular-aria',
            'angular-messages',
            'toaster',
            'ngAnimate',
            'ngResource',
            'ui-bootstrap-tpls',
            'api-check',
            'jquery',
            'bootstrap',
            'jQueryUi',
            'fancytree',
            'angular-ui-router-extras',
            'script!ace-editor',
            'script!TweenMax',
            'text-angular',
            'text-angular-rangy',
            'text-angular-sanitize',
            'angular-foundation-colorpicker',
            'script!flexslider',
            'angular-flexslider',
            'script!zeroclipboard',
            'ng-clip',
            'script!moment'
        ]
    },
    externals: {
        'ace': 'ace'
    },
    devtool: 'source-map',
    context: __dirname + '/app',
    output: {
        filename: 'bundle.js',
        path: './target/js',
        publicPath: '/public/js/',
        library: 'PW',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {test: /jquery\.js$/, loader: 'expose?$' },
            {test: /jquery\.js$/, loader: 'expose?jQuery' },
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components|vendor/,
                loader: 'webpack-traceur?runtime=true&sourceMaps&experimental=true!jshint'
            },
            {test: /[\/\\]angular.min\.js$/, loader: "exports?angular"},
            {test: /[\/\\]register\.js$/, loader: "exports?register"},
            {test: /[\/\\]ace.min\.js$/, loader: "exports?ace"},
            {test: /\.png$/, loader: 'url?mimetype=image/png'},
            {test: /\.html$/, loader: 'raw', exclude: /node_modules|bower_components|vendor/},
            {test: /\.less$/, loader: "style!css!less"},
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=/res/[name].[ext]?[hash]'
            }
        ],
        noParse: [

        ],
        jshint: {
            // Display JSHint messages as webpack errors
            emitErrors: true,

            // fail the build on JSHInt errors
            failOnHint: false,
        }
    },

    amd: { jQuery: true },

    resolve: {
        root: [
            nodeModulesPath,
            bowerComponentsPath,
            vendorPath
        ],
        alias: {
            'directive': __dirname + "/app/common/globals/directive.js",
            'event-listener': __dirname + "/app/common/globals/event-listener.js",
            'jquery': 'jquery/dist/jquery.js',
            'jQueryUi': 'jquery-ui/jquery-ui.min.js',
            'angular': 'angular/angular.min.js',
            'angular-aria': 'angular-aria/angular-aria.min.js',
            'angular-ui-router': 'angular-ui-router/release/angular-ui-router.min.js',
            'angular-ui-router-extras': 'ui-router-extras/release/ct-ui-router-extras.min.js',
            'toaster': 'toaster/toaster.min.js',
            'ngAnimate': 'angular-animate/angular-animate.min.js',
            'ngResource': 'angular-resource/angular-resource.min.js',
            'ui-bootstrap-tpls': 'angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bootstrap': 'bootstrap/dist/js/bootstrap.min.js',
            'fancytree': 'fancytree/dist/jquery.fancytree-all.min.js',
            'ace-editor': 'ace-builds/src-min-noconflict/ace.js',
            'text-angular': 'textAngular/dist/textAngular.min.js',
            'text-angular-rangy': 'textAngular/dist/textAngular-rangy.min.js',
            'text-angular-sanitize': 'textAngular/dist/textAngular-sanitize.min.js',
            'TweenMax': __dirname + '/vendor/greensock-js/src/minified/TweenMax.min.js',
            'TweenLite': __dirname + '/vendor/greensock-js/src/minified/TweenLite.min.js',
            'angular-foundation-colorpicker': 'angular-foundation-colorpicker/js/foundation-colorpicker-module.js',
            'flexslider': 'flexslider/jquery.flexslider.js',
            'angular-flexslider': __dirname + '/vendor/angular-flexslider/angular-flexslider.js',
            'zeroclipboard': 'zeroclipboard/dist/ZeroClipboard.min.js',
            'ng-clip': 'ng-clip/dest/ng-clip.min.js',
            'moment': 'moment/min/moment.min.js',
            'ace': 'ace-builds/src-min-noconflict',
            'lodash': 'underscore/underscore-min'
        },
        extensions: ['', '.js']
    },
    bail: false,
    plugins: [
        new ModuleReplacementPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ComponentResolverPlugin(
            ['js']
        ),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.ProvidePlugin({
            ace: "ace",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        })
    ]
};

function ModuleReplacementPlugin () {
    this.resourceRegExp = [];

    var filesystem = require("fs");
    var modules = filesystem.readdirSync(__dirname + "/app/modules");

    for(var module in modules) {
        var name = modules[module];
        this.resourceRegExp.push(name);
    }
}

ModuleReplacementPlugin.prototype.apply = function (compiler) {
    var resourceRegExp = this.resourceRegExp;
    compiler.plugin("normal-module-factory", function (nmf) {
        nmf.plugin("before-resolve", function (result, callback) {
            if (!result) {
                return callback();
            }

            var split = result.request.split(".");

            if(split.length > 0) {
                var name = split[0];

                if(resourceRegExp.indexOf(name) > -1 && name != 'bower' && name != 'containers' && name != 'service') {
                    result.request = __dirname + "/app/modules/" + split.join("/");
                } else if(name != 'bower' && name == 'containers') {
                    var map = split.slice(1);
                    result.request = __dirname + "/app/containers/" + map.join("/");
                } else if(name == 'bower') {
                    var map = split.slice(1);
                    result.request = bower_dir + "/" + map.join("/");
                }

                return callback(null, result);
            }

            return callback(result, result);
        });
    });
};