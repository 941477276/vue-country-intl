const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || './';

module.exports = {
  mode: 'production',
  entry: './src/components/vue-country-intl/index.vue',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'vue-country-intl.min.js',
    library: 'vueCountryIntl',
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
    new UglifyJsPlugin({
      parallel: true,
      /*compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
        screw_ie8: true,
      },*/
      /*comments: false,*/
    }),
    new ExtractTextPlugin({
      filename: '../lib/vue-country-intl.css', // 从 .js 文件中提取出来的 .css 文件的名称
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
