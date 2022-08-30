export * from './global'

const IS_PROD = process.env.ENV === 'production'

// 通用配置

// 融云通讯 App Key
export const RONGCLOUD_APP_KEY = IS_PROD ? '8brlm7uf8ov93' : '8luwapkv86gol'

// 订阅职位关注公众号页面
export const SUBSCRIBE_PAGE_URL = IS_PROD
  ? 'https://mp.weixin.qq.com/s/sKTUAdyZc_ON77ckwxueHw'
  : 'https://mp.weixin.qq.com/s/cYXjbg_nhukRT9oEr5-3Wg'

// 小程序订阅消息模板 ID
// 【已停用】原测试环境即派测试小程序模板 ID：UgNc47Hcngw8ZQAvuujKyALxGfavffPhh8X7oN2EUHY
export const SUBSCRIBE_TEMPLATE_ID = IS_PROD
  ? 'rtLkUmoiO-u5Jx34sFUAlNyex9ycYTcc5ZlRCBI2gOw'
  : '2mSYFbZIzFz8yF1WJyzv2Ax_vAUANe_AAzwnHKVzgNk'

// 小程序未读消息提醒模板 ID
export const SUBSCRIBE_CHAT_MESSAGE_TEMPLATE_ID = IS_PROD
  ? 'jhZNcIqaUvCXL6AOaPl-6zaRdBXOimdLHUvMyRhbM44'
  : 'OitZjAq3jZMHoXeHNFUiAhYxHAJxPHvl-xOS4y6aH2U'

// 小程序上传简历文件 webview 部署地址
export const UPLOAD_RESUME_URL = IS_PROD
  ? 'https://wx.yimaitongdao.com/bridge/upload.html'
  : 'https://test-wx.yimaitongdao.com/bridge/upload.html'

// service worker 文件路径
export const SW_FILE_PATH = '/service-worker-101.js'

// mock 接口 https://mock.geedos.com/mock/608ba4c6e04018595a60b4ba/example
export const MOCK_HOST = 'https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad'

// mock header 字段
export const MOCK_USER_ID = '608ba4c6e04018595a60b4b9'

// HR 后台跳转地址（我是 HR，我要招人）
export const HR_HOST = IS_PROD
  ? 'https://hr.yimaitongdao.com/m/login/for-account'
  : 'https://test-hr.yimaitongdao.com/m/login/for-account'

// 加入社群跳转地址
export const JOIN_HOST = 'https://mp.weixin.qq.com/s/3KMbXA1yriVH6BmOH81ioA'

// 小程序分享封面图
export const SHARE_APP_IMAGE = 'https://wx.yimaitongdao.com/geebox/images/miniProgram_banner_01.jpg'

// PC 端创建简历时扫码登录地址
export const CREATE_RESUME_SCAN_QECODE = IS_PROD
  ? 'cv.yimaitongdao.com'
  : 'test-cv.yimaitongdao.com'

// 请求超时时间
export const APP_API_TIMEOUT = 10000

// 公司名字
export const APP_COMPANY_NAME = '科锐数字科技(苏州)有限公司'

// 公司名字缩写
export const APP_COMPANY_SHORT_NAME = '科锐数字科技'

// 项目名
export const APP_PROJECT_NAME = '医脉同道'

// 短信验证码长度
export const APP_SMS_LENGTH = 6

// 短信验证码频率
export const APP_SMS_FREQUENCY = 60

// 用户密码加密偏移
export const APP_CRYPTO_OFFSET = -3

// 默认分页大小
export const APP_DEF_PAGE_SIZE = 10

// 完成简历的事件 key
export const COMPLETE_RESUME_EVENT_KEY = 'apply-job-complete-resume'

// 允许上传的简历文件格式
export const ALLOW_RESUME_FILE_TYPE = ['doc', 'docx', 'html', 'htm', 'pdf', 'png', 'jpg', 'jpeg']

// 允许上传的头像文件格式
export const ALLOW_AVATAR_FILE_TYPE = ['jpg', 'png', 'jpeg', 'bmp', 'gif']

// 职位搜索地址 KEY
export const LOCATION_STORAGE_KEY = 'com.ymtd.m.job_search_location'

// OpenID 存储 KEY
export const APP_OPENID_KEY = 'com.ymtd.m.auth.openid'

// token 字段存储 KEY
export const APP_TOKEN_FLAG = 'com.ymtd.m.auth.token'

// 融云 token 字段存储 KEY
export const IM_TOKEN_FLAG = 'com.ymtd.m.auth.imtoken'

// 首次启动小程序延迟初始化融云存储 KEY
export const IM_FIRST_LAUNCH_KEY = 'com.ymtd.m.im.first_launch'

// 上次提醒订阅 IM 通知时间存储 KEY
export const IM_LAST_NOTICE_SUBSCRIBE_TIME_STORAGE_KEY = 'com.ymtd.m.im.last_notice_subscribe_time'

//第一次切换 tab 存储 KEY
export const FIRST_SWITCH_TABS = 'com.ymtd.m.record.first_switch_tab'

//记录进小程序的首页存储 KEY
export const FIRST_LAUNCH_PAGE = 'com.ymtd.m.record.first_launch'

// 全屏 popup 营销弹窗存储 KEY
export const FULLSCREEN_OPEN_TIMES = 'com.ymtd.m.record.full_screen_popup'

// 下半部 popup 营销弹窗存储 KEY
export const FIXEDBOTTOM_OPEN_TIMES = 'com.ymtd.m.record.fixed_bottom_popup'

// 添加小程序营销弹窗存储 KEY
export const ADD_FAVORITE_OPEN_TIMES = 'com.ymtd.m.record.add_favorite_popup'

// 用户分享微信个人信息存储 KEY
export const SHARE_USER_INFO = 'com.ymtd.m.share.user_info'
// 用户简历信息存储 KEY
export const PROFILE = 'com.ymtd.m.profile'
// 用户订阅状态存储 KEY
export const SUBSCRIBE = 'com.ymtd.m.subscribe'
