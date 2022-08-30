// 打测试包时的编译配置
// 注意 NODE_ENV 设为 'production' 是为了减少打包后的体积
// 因此判断环境时请使用 process.env.ENV 而不是 NODE_ENV
module.exports = {
  env: {
    NODE_ENV: '"production"',
    ENV: '"development"',
    SENSORS_REPORT_URL:'"https://shence.yituiep.com/sa?project=default"',
    YT_REPORT_URL: '"https://autotest.yituiep.com"'


  },
  defineConstants: {},
  mini: {},
  h5: {
    webpackChain(chain) {
      // chain
      //   .plugin('webpack-bundle-analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
      //     {
      //       analyzerMode: 'server',
      //       analyzerHost: '127.0.0.1',
      //       analyzerPort: 8889,
      //       reportFilename: 'report.html',
      //       defaultSizes: 'parsed',
      //       openAnalyzer: true,
      //       generateStatsFile: false,
      //       statsFilename: 'stats.json',
      //       statsOptions: null,
      //       logLevel: 'info',
      //     },
      //   ])
      //   .end()
        // .plugin('compression-webpack-plugin')
        // .use(require('compression-webpack-plugin'), [
        //   {
        //     algorithm: 'gzip',
        //     test: new RegExp('.(' + ['js', 'css'].join('|') + ')$'),
        //     threshold: 10240,
        //     minRatio: 0.8,
        //   },
        // ])
        // .end()
    },
  },
  mini: {
    debugReact: false,
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    }
  },
  h5: {},
}
