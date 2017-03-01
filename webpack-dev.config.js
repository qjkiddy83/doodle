var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var os = require('os');
var copyfiles = require('./copyfiles.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

//生成入口对象
function getOEntry() {
    var routerPath = './src/router/',
        oEntry = {},
        files = fs.readdirSync(routerPath); //遍历router文件夹的文件
    files.forEach(function(item) {
        var tmp = item.split('.');
        oEntry[tmp[0]] = [
            [routerPath, item].join('')
        ];
    })
    return oEntry;
}

module.exports = {
    entry: getOEntry(),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
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
        new ExtractTextPlugin('[name].css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // host: 'localhost',
        host: os.networkInterfaces().eth1 ? os.networkInterfaces().eth1[0].address : os.networkInterfaces()['本地连接'][1].address,
        port: 8080,
        inline: true, //可以监控js变化
        hot: true, //热启动
    },
    watch: true,
    watchOptions: {
        poll: true
    }
}

copyfiles("src/static/", "dist/static/")
copyfiles("\.(html|md)$", "dist/")
