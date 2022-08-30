const IS_PROD = process.env.ENV === 'production'

// H5 配置文件

// 后台 URL
export const ONLINE_HOST = IS_PROD ? 'https://m.yimaitongdao.com/api' : '/api'
// 实际请求 'https://test-m.yimaitongdao.com/api/'

// 静态资源 URL
export const STATIC_HOST = IS_PROD
  ? 'https://m.yimaitongdao.com'
  : 'https://test-m.yimaitongdao.com'
