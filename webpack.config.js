var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    os = require('os'),
    merge = require('merge'),
    copyfiles = require('./copyfiles.js'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    cfg_eslint = { //eslint配置
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
    },
    cfg_base = { //基础配置
        entry: getOEntry(),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: getRules()
        }
    },
    _plugins = [new ExtractTextPlugin('[name].css')];
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

function getExports() {
    var plugins = process.env.NODE_ENV === "dev" ? [..._plugins, new webpack.HotModuleReplacementPlugin()] : _plugins;
    var _exports = merge(true, cfg_base, { plugins: plugins });
    if (process.env.NODE_ENV === "dev") {
        _exports = merge(_exports, {
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
        })
    };
    return _exports;
}

function getRules() {
    var rules = [{
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
    }];
    return process.env.NODE_ENV === "dev" ? [cfg_eslint, ...rules] : rules;
}

module.exports = getExports()

copyfiles("src/static/", "dist/static/")
copyfiles("\.html$", "dist/")
