const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin')

module.exports = {
  env: {
    NODE_ENV: '"development"',
    ENV: '"development"',
    SENSORS_REPORT_URL:'"https://shence.yituiep.com/sa?project=default"',
    YT_REPORT_URL: '"https://autotest.yituiep.com"'

  },
  defineConstants: {},

  mini: {
    debugReact: true,
  },

  h5: {
    devServer: {
      port: 8080,
      // https: true,
      // host: 'localhost',
      proxy: {
        '/api': {
          // http://test.m.yimaitongdao.com
          // https://mock.geedos.com/mock/608ba4c6e04018595a60b4ba/example
          target: 'https://test-m.yimaitongdao.com',
          // pathRewrite: { '^/api': '' },
          changeOrigin: true,
          // secure: false,
          headers: {
            mockUserId: '608ba4c6e04018595a60b4b9',
          },
          logLevel: 'debug',
        },
      },
    },
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
