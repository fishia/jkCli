import { useEffect, useRef } from 'react'
import c from 'classnames'
import {
  eventCenter,
  useDidShow,
  useRouter,
} from '@tarojs/taro'
import { View } from '@tarojs/components'

import { IProps } from '@/def/common'
import Modal, { modalEventKey } from '@/components/Modal'
import Toast, { toastEventKey } from '@/components/Toast'
import LoadingStatus, { loadingStatusEventKey } from '../components/LoadingStatus'

import './index.scss'

export interface mainLayoutProps extends IProps {
  navBarTitle?: string
  isTabbarPage?: boolean
  border?: boolean
  defaultLoading?: boolean
}

const MainLayout = (props: mainLayoutProps) => {
  const { navBarTitle, isTabbarPage, defaultLoading, children, className, style } = props

  const router = useRouter()

  const modalRef = useRef<any>(null)
  const toastRef = useRef<any>(null)
  const loadingStatusRef = useRef<any>(null)

  useEffect(() => {
    eventCenter.on(
      router.path + modalEventKey,
      (p, type = 'open') => void modalRef?.current?.[type](p)
    )
    eventCenter.on(
      router.path + toastEventKey,
      (p, type = 'open') => void toastRef.current?.[type](p)
    )
    eventCenter.on(
      router.path + loadingStatusEventKey,
      (p, type = 'open') => void loadingStatusRef.current?.[type](p)
    )

    return () => {
      eventCenter.off(router.path + modalEventKey)
      eventCenter.off(router.path + toastEventKey)
      eventCenter.off(router.path + loadingStatusEventKey)
    }
  }, [router.path])

  useDidShow(() => {
  })

  return (
    <View className={c('main-layout', className)} style={style}>
      {children}
      <Modal ref={modalRef} />
      <Toast ref={toastRef} />
      <LoadingStatus
        ref={loadingStatusRef}
        defaultLoading={defaultLoading}
        hasNavBar={Boolean(navBarTitle)}
        hasTabBar={isTabbarPage}
      />
    </View>
  )
}

export default MainLayout
