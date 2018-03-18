const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true, //告诉 dev-server 我们在用 HMR
        hotOnly: true // 指定如果热加载失败了禁止刷新页面 (这是 webpack 的默认行为)，这样便于我们知道失败是因为何种错误
    },
    entry: {
        app: './src/index.js',

    },
    output: {
        filename: 'app.bundle.js',
        //chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use:[

                    'babel-loader'
                ],
                exclude: /node_modules/,

            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // 在编译的代码里设置了`process.env.NODE_ENV`变量
        }),
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            template: './src/tpl/index.ejs',
            filename: 'index.html'
        }),
        new webpack.HashedModuleIdsPlugin(),

        new webpack.HotModuleReplacementPlugin(), // 启用 HMR
        new webpack.NamedModulesPlugin() // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径

    ]
};