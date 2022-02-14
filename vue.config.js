const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  baseUrl: './',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 去除console.log
      let removeConsole = new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console : true,
            pure_funcs: ['console.log']
          }
        },
        parallel: os.cpus().length * 2
      });
      // config.plugins.push(UglifyJsParallelPlugin);
      config.plugins.push(removeConsole);
    } else {
      // mutate for development...
      /*config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: __dirname + '/node_modules/country-flag/country-flag-svgs',
              to: __dirname + '/src/components',
              // ignore: ['.*']
            }
          ]
        })
      )*/
    }
  }
}
