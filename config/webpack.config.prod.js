const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {

    entry: "./src/index.js",

    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify('http://54.157.248.16:8000'),
            'process.env.WEB_SOCKET_BASE_URL': JSON.stringify('ws://54.157.248.16:8000'),
            'process.env.FRONTEND_BASE_URL': JSON.stringify('https://privilegewalk.herokuapp.com')
        }),
    ],

    devServer: {
        allowedHosts: 'all',
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            }
        ]
    }

}