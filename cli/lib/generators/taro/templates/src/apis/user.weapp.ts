import { IContactInfo, IJobCategory, ILocation, IList, IRelational } from '@/def/common'
import { ApplyStatusType, ISubscribeStatus, loginParams, wxLoginParams } from '@/def/demo'
import { ICompany, IJob } from '@/def/job'
import { IDiscover } from '@/def/discover'
import Client from '@/apis/client'

// 获取验证码前置key
export const getOptKeyApi = (phone: string) =>
  Client({ url: '/hrs/captcha/key', method: 'POST', data: { phone } })

// 获取当前手机验证码
export const getOptApi = (captcha_key: string, captcha_code: string) =>
  Client({
    url: '/hrs/verification',
    method: 'POST',
    data: { captcha_type: 'key', captcha_key, captcha_code },
  })

// 判断手机号码账号是否存在
export const beenExistApi = (phone: string) => Client({ url: '/hrs/phone/exist', data: { phone } })

// 通过验证码确认注册
export const registerApi = (params: loginParams) =>
  Client({ url: '/hrs/register', method: 'POST', data: { ...params } })

// 通过验证码登录
export const loginApi = (params: loginParams) =>
  Client({ url: '/auth/login', method: 'POST', data: { ...params, protocol: true } })

// 登录用户获取个人信息
export const getInfoApi = () => Client({ url: '/auth/info' })

// 获取用户已投递的职位
export const listRecordApi = (page: number, status: ApplyStatusType) =>
  Client({ url: '/auth/applies', data: { page, status } })

// 获取用户已收藏的职位
export async function listFavoriteJobsApi(page: number): Promise<IList<IRelational<'jd', IJob>>> {
  return Client({ url: '/auth/favorites', data: { type: 'jd', page } })
}

// 获取用户已收藏的公司
export async function listFavoriteCompaniesApi(
  page: number
): Promise<IList<IRelational<'jd', ICompany>>> {
  return Client({ url: '/auth/favorites', data: { type: 'company', page } })
}

// 获取用户已收藏的文章
export async function listFavoriteAritclesApi(
  page: number
): Promise<IList<IRelational<'article', IDiscover>>> {
  return Client({ url: '/auth/favorites', data: { type: 'article', page } })
}

// 获取推荐职位列表
export async function listRecommendedJobsApi(
  page: number
): Promise<IList<IRelational<'jd', IJob>>> {
  return Client({ url: '/auth/recommended-jds', data: { page } })
}

// 获取用户 OpenId
export const getUserOpenIdApi = (code: string) =>
  Client({ url: '/app/init', method: 'POST', data: { code } })

// 小程序手机号登录
export const wxLoginApi = (params: wxLoginParams) =>
  Client({ url: '/auth/login', method: 'POST', data: { ...params } })

interface IResponseSubscribeStatus {
  is_subscribe: boolean
  cities: ILocation[]
  positions: string[]
  positions_label: string
  conditions: {
    cities: boolean
    positions: boolean
    wx: boolean
  }
}

// 拉取用户订阅职位详情
export async function fetchSubscribeStatusApi(): Promise<ISubscribeStatus> {
  function handleExpectJobs(labels: string, jobIds: number[]): IJobCategory[] {
    return (labels || '')
      .split(',')
      .filter(Boolean)
      .reduce(
        (result, jobLabel, index) => [
          ...result,
          { label: jobLabel, value: String(jobIds[index]), id: jobIds[index] },
        ],
        []
      )
  }

  return Client<IResponseSubscribeStatus>({ url: '/auth/intents/subscription' }).then(result => ({
    is_subscribe: result.is_subscribe,
    cities: result.cities,
    jobs: handleExpectJobs(result.positions_label, result.positions.map(Number)),
    conditions: {
      cities: result.conditions.cities,
      positions: result.conditions.positions,
      wx: result.conditions.wx,
    },
  }))
}

// 订阅职位：保存期望职位
export async function setExpectJobsApi(jobs: IJobCategory[]): Promise<void> {
  return Client({
    url: '/auth/intents/positions',
    method: 'POST',
    data: { positions: jobs.map(job => job.value) },
  })
}

// 订阅职位：保存期望城市
export async function setExpectCitiesApi(cities: ILocation[]): Promise<void> {
  return Client({
    url: '/auth/intents/cities',
    method: 'POST',
    data: { cities: cities.map(city => city.id) },
  })
}

// 订阅职位：提交订阅
export async function subscribeApi(): Promise<void> {
  return Client({ url: '/auth/intents/subscribe', method: 'PUT' })
}

// 订阅职位：取消订阅
export async function cancelSubscribeJobsApi(): Promise<void> {
  return Client({ url: '/auth/intents/unsubscribe', method: 'PUT' })
}

// 设置用户隐私
export async function setUserPrivacyApi(isOpen: boolean): Promise<void> {
  return Client({ url: '/auth/privacy', method: 'PUT', data: { is_open: isOpen } })
}

// 拉取商务合作页联系方式
export async function fetchBizContactApi(): Promise<IContactInfo> {
  return Client({ url: '/options/contacts' })
}

// 营销弹窗背景图
export async function fetchMarketWindowBgImage(): Promise<any> {
  return Client({ url: '/market-window' })
}
