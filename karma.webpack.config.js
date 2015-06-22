var webpack = require('webpack');
var ComponentResolverPlugin = require('component-resolver-webpack');
var webpackConfig = require("./webpack.config.js");
var testArgs = require('yargs').argv;
var resolve = webpackConfig.resolve,
    loaders = webpackConfig.module.loaders,
    plugins = webpackConfig.plugins,
    getPostLoaders = function() {
        return testArgs.noCoverage ? [] : [
            {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)\//,
                loader: 'istanbul-instrumenter'
            }
        ];
    };

module.exports = {
    //entry: webpackConfig.entry,
    //output: webpackConfig.output,
    module: {
        loaders: loaders,
        noParse: webpackConfig.module.noParse,
        postLoaders: getPostLoaders()
    },
    resolve: resolve,
    progress: true,
    color: true,
    plugins: [
        new ModuleReplacementPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ComponentResolverPlugin(
            ['js']
        ),
        new webpack.ProvidePlugin({
            ace: "ace",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        })
    ],
    context: webpackConfig.context,
    devtool: 'inline-source-map',
    amd: { jQuery: true }
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