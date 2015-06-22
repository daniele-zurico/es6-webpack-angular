var CompressionPlugin = require("compression-webpack-plugin");

module.exports = function(grunt) {

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    var path = require('path');
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    var karma = require('karma');

    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.AggressiveMergingPlugin(),
                    new CompressionPlugin({
                        asset: "{file}.gz",
                        algorithm: "gzip",
                        regExp: /\.js$|\.html$/,
                        threshold: 10240,
                        minRatio: 0.8
                    })
                )
            },
            "build-dev": {
                devtool: "source-map",
                debug: true
            }
        },

        "webpack-dev-server": {
            options: {
                webpack: webpackConfig,
                port: 7358,
                progress: true,
                color: true,
                publicPath: '/public/js/'
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: "source-map",
                    debug: true
                }
            }
        },

        watch: {
            app: {
                files: ["app/**/*", "public/**/*"],
                tasks: ["webpack:build-dev"],
                options: {
                    spawn: false
                }
            }
        },

        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                sourceMapIn: 'target/js/bundle.js.map',
                screwIE8: true,
                compress: true,
                preserveComments: false,
                drop_console: true
            },
            my_target: {
                files: {
                    'target/js/bundle.js': ['target/js/bundle.js']
                }
            }
        },

        copy: {
            target: {
                files: [
                    //{cwd: 'app/modules', expand: true, src: '**/*.html', dest: 'target/modules/'},
                    {cwd: 'public/ui-assets/fonts', expand: true, src: '**/*', dest: 'target/ui-assets/fonts'},
                    {cwd: 'public/ui-assets/fonts', expand: true, src: '**/*', dest: 'target/fonts'},
                    {cwd: 'public/ui-assets/css/bootstrap/fonts', expand: true, src: '**/*', dest: 'target/ui-assets/fonts'},
                    {cwd: 'public/ui-assets/img', expand: true, src: '**/*', dest: 'target/ui-assets/img'},
                    {cwd: 'public', expand: true, src: '**/*.html', dest: 'target/'},
                    {cwd: 'public/scripts', expand: true, src: '**/*.js', dest: 'target/scripts'},

                    // Fancy tree deps
                    {
                        cwd: 'bower_components/fancytree/dist/skin-themeroller',
                        expand: true,
                        src: '**/*.gif',
                        dest: 'target/ui-assets/css'
                    },

                    // Ace deps
                    {cwd: 'bower_components/ace-builds/src-min-noconflict', expand: true, src: '**/theme-*', dest: 'target/bower_components/ace-builds/src-min-noconflict'},
                    {cwd: 'bower_components/ace-builds/src-min-noconflict', expand: true, src: '**/mode-*', dest: 'target/bower_components/ace-builds/src-min-noconflict'},
                    {cwd: 'bower_components/ace-builds/src-min-noconflict', expand: true, src: '**/worker-*', dest: 'target/bower_components/ace-builds/src-min-noconflict'},
                    {cwd: 'bower_components/ace-builds/src-min-noconflict/snippets', expand: true, src: '**/*', dest: 'target/bower_components/ace-builds/src-min-noconflict/snippets'},

                    // Zero clipboard
                    {cwd: 'bower_components/zeroclipboard', expand: true, src: '**/*.swf', dest: 'target/bower_components/zeroclipboard'}
                ]
            }
        },

        cssmin: {
            build: {
                options: {
                    keepSpecialComments:0,
                    processImport: true,
                    roundingPrecision: -1,
                    shorthandCompacting: false,
                    aggressiveMerging: false,
                    advanced: false,
                    cleancss: true
                },
                files: {
                    'target/ui-assets/css/main.css': [ 'public/ui-assets/css/main.css' ]
                }
            }
        },

        clean: {
            build: {
                src: [ 'target' ]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Development
    grunt.registerTask("default", ["webpack-dev-server:start"]);

    // Build and watch cycle (another option for development)
    // Advantage: No server required, can run app from filesystem
    grunt.registerTask("test", ["karma:unit"]);

    // Production build
    grunt.registerTask("build", ["clean", "webpack:build", "copy", "cssmin", "uglify"])

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
};