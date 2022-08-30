import R from 'ramda'
import Taro, { Chain, getStorageSync, setStorage } from '@tarojs/taro'

import { APP_TOKEN_FLAG, MOCK_USER_ID, ONLINE_HOST } from '@/config'
import { CacheValueType } from '@/def/client'
import { decryptToken } from '@/services/CryptoService/decrypt'
import { getOpenId } from '@/services/DemoService'

export const getTokenHeader = function () {
  const cryptedToken = getStorageSync(APP_TOKEN_FLAG)
  const token = cryptedToken ? decryptToken(cryptedToken) : null

  return token ? { Authorization: token } : {}
}

export const getOpenIdHeader = function () {
  return { openid: getOpenId() }
}

export const getMockHeader = function () {
  if (process.env.ENV === 'production') {
    return {}
  }

  return { mockUserId: MOCK_USER_ID }
}

export function combineUrl(url: string): string {
  if (url.startsWith('http')) {
    return url
  }
  return ONLINE_HOST + url
}

export const cacheInterceptor = function (chain: Chain): Promise<any> {
  const requestParams = chain.requestParams
  const { throttle, cacheKey } = requestParams

  if (cacheKey && throttle) {
    const take: CacheValueType = getStorageSync(cacheKey)
    if (take && Date.now() - take.timeStamp < throttle) {
      return new Promise(resolve => resolve(take.data))
    }

    return chain.proceed(requestParams).then(res => {
      const put: CacheValueType = {
        timeStamp: Date.now(),
        data: res,
      }
      setStorage({ key: cacheKey, data: put })

      return res
    })
  }

  return chain.proceed(requestParams)
}

export const requestInterceptor = function (chain: Chain): Promise<any> {
  const requestParams = chain.requestParams
  const reqHeader = requestParams.header
  const defaultHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...getMockHeader(),
    ...getOpenIdHeader(),
    ...getTokenHeader(),
  }
  requestParams.header = reqHeader ? R.mergeLeft(reqHeader, defaultHeader) : defaultHeader
  requestParams.url = combineUrl(requestParams.url)

  return chain.proceed(requestParams)
}

// 响应拦截器，只能拦截服务器返回成功的请求
export const responseInterceptor = function (chain: Chain): Promise<any> {
  const requestParams = chain.requestParams

  const handleFailResponse = res => {
    const resData = res.data
    const success = resData?.success
    return new Promise((resolve, reject) => {
      // 204 响应没有 body
      if (success || res.statusCode === 204) {
        resolve(resData.data)
      } else if (resData.status === 0 && resData.msg === 'success') {
        // 易推的响应格式，与业务 API 的响应格式有区别，此处也要 resolve 否则会算请求失败
        resolve({})
      } else {
        // 错误处理统一放在client请求完成之后处理，因为这里无法拦截到失败的请求
        reject(resData)
      }
    })
  }
  return chain.proceed(requestParams).then(handleFailResponse)
}

export const timeoutInterceptor = Taro.interceptors.timeoutInterceptor

export const logInterceptor = Taro.interceptors.logInterceptor
