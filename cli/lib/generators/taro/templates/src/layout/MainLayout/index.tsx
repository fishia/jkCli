import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useRef } from 'react'
import c from 'classnames'
import { View } from '@tarojs/components'

import { IProps } from '@/def/common'
import {
  setModalRef,
  setToastRef,
  setLoginPopupRef,
  setFullScreenPopupRef,
  setFixedBottomPopupRef,
} from '@/store/actions/common'
import {
  IModalCurrent,
  IToastCurrent,
  ILoginPopupCurrent,
  IFullScreenPopupCurrent,
  IFixedBottomPopupCurrent,
} from '@/store/reducers/common'
import Modal from '@/components/Modal'
import Toast from '@/components/Toast'
import { LoginPopup, FullScreenPopup, FixedBottomPopup } from '@/components/Popup'
import { useIsLogin, useUpdateCurrentUserInfo } from '@/hooks/custom/useUser'

import './index.scss'

export interface mainLayoutProps extends IProps {
  navBarTitle?: string
  isTabbarPage?: boolean
  border?: boolean
  defaultLoading?: boolean
}

const MainLayout = (props: mainLayoutProps) => {
  const { children, className, style } = props
  // useSystemInfo()

  const dispatch = useDispatch()
  const isLogined = useIsLogin()
  const updateCurrentUserInfo = useUpdateCurrentUserInfo()
  const modalRef = useRef<IModalCurrent>(null)
  const toastRef = useRef<IToastCurrent>(null)
  const loginPopupRef = useRef<ILoginPopupCurrent>(null)
  const fullscreenPopupRef = useRef<IFullScreenPopupCurrent>(null)
  const fixedbottomPopupRef = useRef<IFixedBottomPopupCurrent>(null)

  const initUserInfo = useCallback(() => {
    if (isLogined) {
      updateCurrentUserInfo().catch(({ errorMessage }) => {
        toastRef.current?.open({ content: errorMessage || '用户信息获取失败' })
      })
    }
  }, [isLogined, updateCurrentUserInfo, toastRef])

  useEffect(() => {
    // 初始化Redux数据
    dispatch(setModalRef(modalRef))
    dispatch(setToastRef(toastRef))
    dispatch(setLoginPopupRef(loginPopupRef))
    dispatch(setFullScreenPopupRef(fullscreenPopupRef))
    dispatch(setFixedBottomPopupRef(fixedbottomPopupRef))

    initUserInfo()

    return () => {
      dispatch(setModalRef(null))
      dispatch(setToastRef(null))
      dispatch(setLoginPopupRef(null))
      dispatch(setFullScreenPopupRef(null))
      dispatch(setFixedBottomPopupRef(null))
    }
  }, [
    modalRef,
    toastRef,
    loginPopupRef,
    fullscreenPopupRef,
    fixedbottomPopupRef,
    dispatch,
    initUserInfo,
  ])

  return (
    <View className={c('main-layout', className)} style={style}>
      {children}
      <Modal ref={modalRef} />
      <Toast ref={toastRef} />
      <LoginPopup ref={loginPopupRef} />
      <FullScreenPopup ref={fullscreenPopupRef} />
      <FixedBottomPopup ref={fixedbottomPopupRef} />
    </View>
  )
}

export default MainLayout
