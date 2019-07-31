const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');
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
    }
  },
}
