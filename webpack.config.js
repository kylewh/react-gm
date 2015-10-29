'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};
var momentExternal = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment'
};

module.exports = {
    entry: './lib/index',
    externals: {
        'react': reactExternal,
        'react-native': reactExternal,
        'moment': momentExternal
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
            { test : /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-gm.js',
        library: 'ReactGM',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('react-gm.css')
    ]
};