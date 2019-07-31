const path = require('path')
// 优雅的进度等待插件(类似于loading)
const ora = require('ora')
// 递归删除文件
const rm = require('rimraf')
// 修改控制台中字符串的样式
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.js')

const spinner = ora('building for production...')
spinner.start()
console.log(' ')

rm(path.resolve(__dirname, 'lib'), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('大功告成！'))
  })
})
