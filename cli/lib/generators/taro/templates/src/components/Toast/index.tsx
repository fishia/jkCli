import React, { useImperativeHandle, useState } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import _ from 'lodash'

import useTimeoutFn from '@/hooks/sideEffects/useTimeout'
import { IProps } from '@/def/common'

import './index.scss'

export const toastEventKey = 'toast'

export interface ToastState extends IProps {
  content: string
  isOpened?: boolean
  onClose?: Function
  duration?: number
}

const Toast = (p, ref) => {
  useImperativeHandle(ref, () => ({
    open,
  }))
  const [state, setState] = useState<ToastState>({ content: '', isOpened: false })
  const { content, className, isOpened, onClose, duration = 3000 } = state

  const close = () => {
    onClose && onClose()
    setState({ isOpened: false, content: '' })
  }
  const [, , reset] = useTimeoutFn(close, duration)
  const open = (props: ToastState) => {
    setState({ ...props, isOpened: true })
    // 定时器关闭Toast
    reset()
  }
  return (
    <View className={classNames(className, 'hd-toast', { 'hd-toast--active': isOpened })}>
      <View className="hd-toast__content">
        <Text className="hd-toast__text">{_.isString(content) ? content : '未知错误'}</Text>
      </View>
    </View>
  )
}

export default React.forwardRef(Toast)
