import _ from 'lodash'
import { navigateTo, switchTab } from '@tarojs/taro'

import { STATIC_HOST } from '@/config'
import isTabBar from './isTabBar'

import defaultAvatar from '@/assets/imgs/default-avatar.png'
import defaultFemaleAvatar from '@/assets/imgs/default-avatar-female.png'

/**
 * 拼接图片等静态资源地址
 * @param url 相对路径
 * @returns 完整路径
 */
export function combineStaticUrl(url: string = '') {
  if (url.startsWith('http') || url === defaultAvatar || url === defaultFemaleAvatar) {
    return url
  }

  if (STATIC_HOST.endsWith('/') && url.startsWith('/')) {
    return STATIC_HOST + url.slice(1)
  } else if (!STATIC_HOST.endsWith('/') && !url.startsWith('/')) {
    return STATIC_HOST + '/' + url
  }

  return STATIC_HOST + url
}

export function isWeapp() {
  return process.env.TARO_ENV === 'weapp'
}

export function isH5() {
  return process.env.TARO_ENV === 'h5'
}

//序列化数据
export function jsonToUrl(jsonData) {
  // 过滤掉值为 '' || undefined || null || 及空数组 的对象属性
  const postData = _.isObject(jsonData)
    ? _.pickBy(jsonData, function (value: any) {
        return value !== '' && value !== undefined && value !== null && value.toString().length
      })
    : {}
  let params = ''
  for (let i in postData) {
    params += `&${i}=${postData[i]}`
  }
  return encodeURI(params.slice(1))
}

const mapOldPath = {
  '/pages/position': '/weapp/pages/job/index', //首页
  '/pages/center': '/weapp/pages/my/index', //我的
  '/pages/tabResume': '/weapp/resume/index/index', //简历
  '/pages/article': '/weapp/pages/discover/index', //发现
  '/pages/resume/index': '/weapp/resume/index/index', //简历
  '/packageA/relatedPos': '/weapp/job/job-batch-share/index', //职位批量分享
  '/packageA/posDesc': '/weapp/job/job-detail/index', //职位详情页
  '/packageA/comDesc': '/weapp/job/company-index/index', // 公司详情页
  '/packageA/resume-competition': '/weapp/resume/resume-competition/index', //简历大赛页
  '/packageA/activePage': '/weapp/active/index', //招聘会活动首页
  '/pages/positionTypeList': '/weapp/job/job-zones/index', //专区页
  '/pages/webViewBridge': '/weapp/general/webview/index', //Webview 页
  '/packageA/articleDetail': '/weapp/discover/discover-detail/index', //文章详情页
  '/packageA/deliverRecord': '/weapp/my/record/index', //投递记录页
  '/packageA/aboutUs': '/weapp/my/cooperation/index', //商务合作页
}

// 旧小程序路由匹配转化
export function translateOldRoute(path: string, query) {
  const pagePath = path.startsWith('/') ? path : '/' + path

  if (mapOldPath[pagePath]) {
    return `${mapOldPath[pagePath]}?${jsonToUrl(query)}`
  } else if (process.env.TARO_ENV === 'h5') {
    return '/h5/error/index'
  } else {
    return '/weapp/general/error/index'
  }
}

// banner跳转页面
export function linkToURL(url): string {
  if (url) {
    let path = _.split(url, '?')[0].startsWith('/')
        ? _.split(url, '?')[0]
        : '/' + _.split(url, '?')[0],
      queryList = _.split(url, '?')[1]?.match(/([^\?&]+)=([^&]+)/g) || [],
      query = queryList.reduce((total, item) => {
        total[item.split('=')[0]] = item.split('=')[1]
        return total
      }, {})
    //区分旧小程序，新小程序
    if (mapOldPath[path]) {
      return translateOldRoute(path, query)
    } else {
      return url
    }
  } else {
    throw new Error('linkToURL 需要一个 url 参数')
  }
}

export function jumpOldUrl(oldUrl: string) {
  const url = linkToURL(oldUrl)

  if (isTabBar(url)) {
    switchTab({ url })
  } else {
    navigateTo({ url })
  }
}

export function jumpToWebviewPage(url: string, title?: string) {
  navigateTo({
    url:
      `/weapp/general/webview/index?url=${encodeURIComponent(url)}` +
      (title ? `&title=${encodeURIComponent(title || ' ')}` : ''),
  })
}
