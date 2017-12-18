const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //installed via npm
const settings = require('./settings.js');

module.exports = {
    entry: {
        index: path.resolve( settings.srcPath, 'app.js'),
    },
    resolve: {
        extensions: [".js", ".scss"],
        modules: [settings.srcPath, "node_modules"],
        alias: {
            vue: 'vue/dist/vue.js'
        }
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
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader?sourceMap" },
                    { loader: "sass-loader?sourceMap" }
                ]
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
                test: settings.fileLoaderRegEx,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({

        }),
        new HtmlWebpackPlugin({
            title: 'webpack + vuejs boilerplate',
            template: path.resolve( settings.srcPath, 'Main.ejs'),
            inject: true,
            hash: false // cache-busting
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
            KEYS: {
                CDN: JSON.stringify(settings.cdnDevelopment),
                URL: JSON.stringify(settings.cdnDevelopment)
            }
        })
    ],
    devtool: "cheap-eval-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "./app"),
        disableHostCheck: true,
        inline: true,
        historyApiFallback: true,
        host: '0.0.0.0'
    },
    performance: {
        hints: false
    }
}