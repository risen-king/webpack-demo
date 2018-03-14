const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); // 引入 webpack 便于调用其内置插件


const ExtractTextPlugin = require("extract-text-webpack-plugin");

const IS_PRODUCTION =  Boolean(process.env.NODE_ENV === 'production');

console.log("*******************************");
console.log(IS_PRODUCTION);
console.log("*******************************");

let extractStylePlugins = [];
let styleLoaderRuels = [];
if(IS_PRODUCTION){
    const extractCss = new ExtractTextPlugin({
        filename: "[name].[contenthash].css",
    });

    const extractSass = new ExtractTextPlugin({
        filename: "[name].[contenthash].css",
    });

    const extractLess = new ExtractTextPlugin({
        filename: "[name].[contenthash].css",
    });

    extractStylePlugins = [
        extractCss,
        extractSass,
        extractLess
    ];

    styleLoaderRuels = [
        {
            test: /\.css$/,
            use: extractSass.extract({
                use:[{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }] ,
                fallback: 'style-loader'
            }),

        },
        {
            test: /\.scss$/,
            use: extractSass.extract({
                use:[{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }] ,
                fallback: 'style-loader'
            }),

        },
        {
            test:/\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },{
                    loader:'less-loader',
                    options: {
                        sourceMap: true
                    }
                }],
                fallback: "style-loader"
            })
        },
    ]

    console.log(styleLoaderRuels);

}else{
    extractStylePlugins = [];
    styleLoaderRuels = [
        {
            test: /\.css$/,
            use:[
                "style-loader",
                "css-loader"
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                "css-loader",
                "sass-loader"
            ]
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                "css-loader",
                "less-loader"
            ]

        }
    ];
}




module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [
            ...styleLoaderRuels,
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
    plugins:[
        ...extractStylePlugins,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 抽取出的模块的模块名
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })
    ],
    externals: {
        'jquery': 'window.jQuery',
    },
};