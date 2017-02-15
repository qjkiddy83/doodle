var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var os = require('os');
var copyfiles = require('./copyfiles.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: true,
        dead_code: true,
        drop_debugger: true,
        sequences: true,
        unused: true,
        drop_console: false //去掉输出信息
    },
    //配置中的变量不压缩
    mangle: {
        except: ['$super', '$', 'exports', '_', 'Promise', 'require']
    }
});

//生成入口对象
function getOEntry() {
    var routerPath = './src/router/',
        oEntry = {},
        files = fs.readdirSync(routerPath); //遍历router文件夹的文件
    files.forEach(function(item) {
        var tmp = item.split('.');
        if (!tmp[1] == 'js') { //过滤非js文件
            return;
        }
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
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.css$/,
            loader: 'postcss-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]&publicPath=../'　　　　
        }]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        uglifyPlugin,
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host : 'localhost',
        // host: os.networkInterfaces().eth1?os.networkInterfaces().eth1[0].address:os.networkInterfaces()['本地连接'][1].address,
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
