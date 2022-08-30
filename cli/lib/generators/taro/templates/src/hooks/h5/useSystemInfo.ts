import { useEffect } from 'react'
import { setSystem } from '@/store/actions/system'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'

/**
 * h5端监听页面大小变化,重新读取设备信息并更新仓库
 */
export default function useSystemInfo() {
  const dispatch = useDispatch()
  useEffect(() => {
    const handler = () => {
      const systemInfo = Taro.getSystemInfoSync()
      dispatch(setSystem(systemInfo))
    }
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.addEventListener('resize', handler)
    }

    return () => {
      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        window.removeEventListener('resize', handler)
      }
    }
  }, [dispatch])
}
