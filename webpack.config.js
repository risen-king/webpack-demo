const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); // 引入 webpack 便于调用其内置插件

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        hotOnly:true

    },
    // entry: './src/index.js',
    entry: {
        app: './src/index.js',
        vendor: [
            'babel-polyfill'
        ]
        //print: './src/print.js'
        //another: './src/another.js'
    },
    output: {
        // filename: 'bundle.js',
        //filename: '[name].bundle.js',
        filename: '[name].[chunkhash].js',
        //filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].bundle.js', // 在配置文件中使用`process.env.NODE_ENV`
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
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
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'index.html'
        }),
        new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
        new CleanWebpackPlugin(['dist']),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 抽取出的模块的模块名
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })

        //new webpack.HotModuleReplacementPlugin(), // 启用 HMR
        //new webpack.NamedModulesPlugin() // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
    ]
}