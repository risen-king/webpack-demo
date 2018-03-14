const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

let selfConfig = {
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['dist']),

        new webpack.HashedModuleIdsPlugin(),

        new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = Merge(CommonConfig, selfConfig);
module.exports = selfConfig;