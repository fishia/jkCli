import React from 'react'
import { getLaunchOptionsSync } from '@tarojs/taro'

import { ModalState } from '@/components/Modal'
import {
  PopupState,
  FullScreenPopupState,
  FixedBottomPopupState,
  AddFavoritePopupState,
} from '@/components/Popup'
import { setCurrentTabIndex, CommonActionType } from '../actions/common'
import appStore from '..'

const weappConfig = require('@/config/router.weapp.ts')

export declare type IModalCurrent = { open: (state: ModalState) => void; close: Function }
export declare type IToastCurrent = { open: (state: ModalState) => void }
export declare type ILoginPopupCurrent = { open: (state?: PopupState) => void; close: Function }
export declare type IFullScreenPopupCurrent = {
  open: (state: FullScreenPopupState) => void
  close: Function
}
export declare type IFixedBottomPopupCurrent = {
  open: (state: FixedBottomPopupState) => void
  close: Function
}
export declare type IAddMyMiniAppTipsCurrent = {
  open: (state: AddFavoritePopupState) => void
}
export declare namespace CommonProps {
  type ModalRefType = React.RefObject<IModalCurrent> | null
  type ToastRefType = React.RefObject<IToastCurrent> | null
  type LoginPopupRefType = React.RefObject<ILoginPopupCurrent> | null
  type FullScreenPopupRefType = React.RefObject<IFullScreenPopupCurrent> | null
  type FixedBottomPopupRefType = React.RefObject<IFixedBottomPopupCurrent> | null

  type CommonType = {
    modalRef: ModalRefType
    toastRef: ToastRefType
    loginPopupRef: LoginPopupRefType
    fullscreenPopupRef: FullScreenPopupRefType
    fixedbottomPopupRef: FixedBottomPopupRefType
    refresh: number
    currentTabIndex: number
  }
}

const mainPageUrls: string[] = weappConfig.tabBar.list.map(item => item.pagePath)
const routeUrl: string = getLaunchOptionsSync().path || mainPageUrls[0]

const initialTabIndex = Math.max(
  mainPageUrls.findIndex(item => item === routeUrl),
  0
)

const INITIAL_STATE: CommonProps.CommonType = {
  modalRef: null,
  toastRef: null,
  loginPopupRef: null,
  fullscreenPopupRef: null,
  fixedbottomPopupRef: null,
  refresh: 0,
  currentTabIndex: initialTabIndex,
}

// 此处使用 onAppRoute 此非公有 API 来处理跳转
// @ts-ignore
wx.onAppRoute(e => {
  if (['switchTab', 'redirectTo', 'reLaunch'].includes(e.openType)) {
    appStore.dispatch(setCurrentTabIndex(mainPageUrls.findIndex(item => item === e.path)))
  }
})

export default function CommonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CommonActionType.SET_MODAL:
      return { ...state, modalRef: action.modalRef }
    case CommonActionType.SET_TOAST:
      return { ...state, toastRef: action.toastRef }
    case CommonActionType.SET_LOGINPOPUP:
      return { ...state, loginPopupRef: action.loginPopupRef }
    case CommonActionType.SET_FULLSCREENPOPUP:
      return { ...state, fullscreenPopupRef: action.fullscreenPopupRef }
    case CommonActionType.SET_FIXEDBOTTOMPOPUP:
      return { ...state, fixedbottomPopupRef: action.fixedbottomPopupRef }
    case CommonActionType.SET_REFRESHHOMEPAGE:
      return { ...state, refresh: state.refresh + 1 }
    case CommonActionType.SET_CURRENT_TAB_INDEX:
      return { ...state, currentTabIndex: action.newIndex }
    default:
      return state
  }
}
