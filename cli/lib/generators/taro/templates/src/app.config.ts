/* eslint-disable import/no-commonjs */
// taro 配置文件不支持 ES6 的导入导出
const merge = require('lodash/merge')

const h5Config = require('./config/router.h5.ts')
const weappConfig = require('./config/router.weapp.ts')

const pageConfig = {
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'myProject',
  },
  debug: process.env.ENV === 'development',
}

if (process.env.TARO_ENV === 'h5') {
  merge(pageConfig, h5Config)
} else if (process.env.TARO_ENV === 'weapp') {
  merge(pageConfig, weappConfig)
}

export default pageConfig
