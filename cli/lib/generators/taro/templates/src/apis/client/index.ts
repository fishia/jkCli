import Taro from '@tarojs/taro'

import { IError, IOptions } from '@/def/client'
import store from '@/store/index'
import { loginOut } from '@/services/DemoService'
import {
  cacheInterceptor,
  requestInterceptor,
  responseInterceptor,
  timeoutInterceptor,
} from './inceptors'

export { getTokenHeader, combineUrl } from './inceptors'

const Request = function () {
  Taro.addInterceptor(cacheInterceptor)
  Taro.addInterceptor(requestInterceptor)
  Taro.addInterceptor(responseInterceptor)
  Taro.addInterceptor(timeoutInterceptor)

  return <T = any>(options: IOptions): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      Taro.request({ throttle: 86400000, method: 'GET', ...options })
        .then(res => {
          resolve(res as any)
        })
        .catch(async err => {
          // 统一的错误处理 条件编译
          if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
            try {
              if (err.status === 401) {
                const error: IError = {
                  errorCode: 401,
                  errorMessage: '登录过期，请重新登录',
                  errors: [],
                }
                loginOut(store.dispatch)

                return reject(error)
              }

              const errorObject = await err.json()
              const error: IError = {
                errorCode: errorObject.errorCode || 500,
                errorMessage: errorObject.errorMessage || '服务器开小差了',
                errors: errorObject.errors || [],
              }
              reject(error)
            } catch {
              const error: IError = {
                errorCode: 500,
                errorMessage: '服务器开小差了',
                errors: [],
              }

              reject(error)
            }
          } else if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
            const error: IError = {
              errorCode: err.errorCode || 500,
              errorMessage: err.errorMessage || '服务器开小差了',
              errors: err.errors || [],
            }

            reject(error)
          } else {
            reject(err)
          }
        })
    })
  }
}

const Client = Request()

export default Client
