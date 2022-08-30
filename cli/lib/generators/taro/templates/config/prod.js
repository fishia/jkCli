// 生产环境的编译配置


const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin')

module.exports = {
  env: {
    NODE_ENV: '"production"',
    ENV: '"production"',
    SENSORS_REPORT_URL:'"https://shence.yituiep.com/sa?project=production"',
    YT_REPORT_URL: '"https://track.yituiep.com"'
  },
  defineConstants: {},
  mini: {
    debugReact: false,
    // uglify: {
    //   enable: true,
    //   config: {
    //     // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
    //   }
    // }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
    webpackChain(chain) {
      chain
        .plugin('SplitChunksPlugin')
        .use(SplitChunksPlugin, [
          {
            chunks: 'all', // initial、async和all
            minSize: 30000, // 形成一个新代码块最小的体积
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
            maxInitialRequests: 3, // 最大初始化请求数
            automaticNameDelimiter: '~', // 打包分割符
            name: true,
            cacheGroups: {
              vendor: {
                test: /(react|lodash|ramda|elliptic|mobile-detect|bn)/,
                name: 'vendor',
                priority: 10,
                enforce: true,
              },
              // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
              common: {
                name: 'common',
                minChunks: 2,
                minSize: 30000,
              },
            },
          },
        ])
        .before('htmlWebpackPlugin')
        .end()
        // .plugin('webpack-bundle-analyzer')
        // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
        //   {
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8889,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     statsOptions: null,
        //     logLevel: 'info',
        //   },
        // ])
        // .end()
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
}
