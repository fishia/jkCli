import path from 'path'


const config = {
  projectName: 'ymtd-taro',
  date: '2021-04-16',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  // 路径别名
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  copy: {
    patterns:
      process.env.TARO_ENV === 'h5'
        ? [
            { from: 'src/favicon.ico', to: 'dist/h5/favicon.ico' },
            { from: 'src/assets/imgs/logo.png', to: 'dist/h5/static/imgs/logo.png' },
            { from: 'src/assets/imgs/pwa/', to: 'dist/h5/static/imgs/pwa/' },
            { from: 'src/assets/js/service-worker-101.js', to: 'dist/h5/service-worker-101.js' },
            { from: 'src/manifest-101.json', to: 'dist/h5/manifest-101.json' },
          ]
        : [],
    options: {},
  },
  framework: 'react',
  mini: {
    baseLevel: 10,
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    sass: {
      resource: [
        path.resolve(__dirname, '..', 'src/assets/styles/variables.weapp.scss'),
        path.resolve(__dirname, '..', 'src/assets/styles/atom.scss'),
      ],
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    router: {
      mode: 'browser',
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    sass: {
      resource: [
        path.resolve(__dirname, '..', 'src/assets/styles/variables.h5.scss'),
        path.resolve(__dirname, '..', 'src/assets/styles/atom.scss'),
      ],
    },
    // webpackChain(chain, webpack) {},
  },
}

module.exports = function (merge) {
  if (process.env.TESTING) {
    return merge({}, config, require('./test'))
  }

  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }

  return merge({}, config, require('./prod'))
}
