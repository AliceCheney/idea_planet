const path = require('path');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    //多出口形式
    entry:{
        index:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    devServer:{
        contentBase:'./dist',  //设置服务器访问的基本目录
        host:'localhost', //服务器的ip地址
        port:8080,  //端口
        open:true  //自动打开页面
    },
    /*入口和出口文件可以不用配置，默认*/
    module:{
        rules:[
            {
//test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
// use 属性，表示进行转换时，应该使用哪个 loader
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                        //babel-loader： 负责 es6语法转化
                        // babel-core： babel核心包
                        // babel-preset-env：告诉babel使用哪种转码规则进行文件处理
                    }
                }
            },
            //css加载器
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            //地址加载器
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader?limit=20000&name=img/[hash:8].[name].[ext]'
            },
            //文件加载器
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    plugins:[
        //assetNameRegExp
        // 正则表达式，用于匹配需要优化或者压缩的资源名。默认值是/.css$/g
        // cssProcessor
        // 用于压缩和优化CSS 的处理器，默认是 cssnano.
        // cssProcessorPluginOptions
        // 传递给cssProcessor的插件选项，默认为{}
        // canPrint
        // 表示插件能够在console中打印信息，默认值是true
        // discardComments去除注释
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano"),
            cssProcessorPluginOptions:{
                preset:['default',{discardComments:{removeAll:true}}]
            },
            canPrint:true
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',  //模板文件路径
            filename:'index.html',         //生成的html文件名称
            // minify:{
            //     minimize:true,                 //打包为最小值
            //     removeAttributeQuotes:true,    //去除引号
            //     removeComments:true,           //去除注释
            //     collapseWhitespace:true,       //去除空格
            //     minifyCSS:true,                //压缩html内css
            //     minifyJS:true,                 //压缩html内js
            //     removeEmptyElements:true,      //清除内存为空的元素
            // },
            hash:true                        //引入产出资源的时候加上哈希避免缓存
        }),
        new CleanWebpackPlugin()
    ]
};

