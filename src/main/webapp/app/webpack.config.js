'use_strict';
//const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack =require('webpack');

module.exports = {
    entry: './home',
    output: {
        filename: './dist/bandle.js',
        library: 'home'
    },

    watch: true, //NODE_ENV == 'development'

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map'//NODE_ENV == 'development' ? 'source-map' : null
};
