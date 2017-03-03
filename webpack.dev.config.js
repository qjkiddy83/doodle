var webpack = require('webpack'),
    path = require('path'),
    copyfiles = require('./copyfiles.js'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: { index: ['./src/router/index.js'] },
    output: { path: path.join(__dirname, 'dist'), filename: '[name].js' },
    module: {
        rules: [{ //eslint配置
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        }, {
            test: /\.css$/,
            loader: 'postcss-loader'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: 'images/[hash:8].[name].[ext]'
            }　　　
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css')
    ],
    devServer: { host: '192.168.15.167', port: 8080, inline: true, hot: true },
    watch: true,
    watchOptions: { poll: true }
}

copyfiles("src/static/", "dist/static/")
copyfiles("\.(html|md)$", "dist/")
