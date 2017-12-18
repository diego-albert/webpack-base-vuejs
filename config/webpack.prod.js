const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //installed via npm
const autoprefixer = require('autoprefixer');
const settings = require('./settings.js');

module.exports = {
    entry: {
        index: path.resolve(settings.srcPath, 'app.js'),
    },
    output: {
        path: settings.buildPath,
        chunkFilename: 'scripts/[name].[chunkhash].js',
        filename: 'scripts/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "stage-0"]
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: "css-loader" },
                        { 
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: 'config/postcss.config.js'
                                }
                            } 
                        },
                        { loader: "sass-loader" }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.json$/,
                use: "json-loader"
            },
            {
                test: /.html$/,
                use: 'html-loader'
            },
            {
                test: settings.fileLoaderFonts,
                loader: 'file-loader',
                query: {
                    name: './assets/fonts/[name].[ext]'
                }
            },
            {
                test: settings.fileLoaderImages,
                loader: 'file-loader',
                query: {
                    name: './assets/images/[name].[ext]'
                }
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: [".js", ".scss"],
        modules: [
            path.resolve(settings.srcPath),
            path.resolve("./node_modules")
        ],
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            
        }),
        new HtmlWebpackPlugin({
            title: 'webpack + vuejs boilerplate',
            filename: path.resolve( settings.buildPath, 'index.html'),
            template: path.resolve( settings.srcPath, 'Main.ejs'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            },
            inject: true,
            hash: true,
            files: {
                css: [
                    "[name].css"
                ],
                js: [
                    "[name].js"
                ]
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            KEYS: {
                CDN: JSON.stringify(settings.cdnDevelopment),
                URL: JSON.stringify(settings.cdnDevelopment)
            }
        }),
        new ExtractTextPlugin({
            filename: "styles/main.css",
        })
    ]
}