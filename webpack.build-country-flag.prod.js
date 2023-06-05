const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || './';

module.exports = {
  mode: 'production',
  entry: './src/components/vue-country-intl/country-flag/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'vue-country-flag.min.js',
    library: 'VueCountryFlag',
    libraryTarget: 'umd',
    libraryExport: 'default',
    publicPath: ASSET_PATH
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 解析图片(css中包含图片)
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      /*{
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath(name){
                console.log(name);
                if(/\.svg$/.test(name)){
                  return 'country-flag-svgs/' + name
                }
              }
            }
          }
        ]
      },*/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // 解析css
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([ // 复制各个国家的图标到lib目录中
      {
        from: __dirname + '/src/components/vue-country-intl/country-data/flags',
        to: __dirname + '/lib/country-flag-svgs',
        // ignore: ['.*']
      }
    ]),
    new ExtractTextPlugin({
      filename: '../lib/vue-country-flag.css', // 从 .js 文件中提取出来的 .css 文件的名称
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
}
