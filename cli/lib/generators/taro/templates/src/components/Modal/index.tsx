import React, { useImperativeHandle, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, ITouchEvent, Image } from '@tarojs/components'
import classNames from 'classnames'

import { IProps, ModalMode } from '@/def/common'
import './index.scss'

export const modalEventKey = 'modal'

export interface ModalState extends IProps {
  title?: string
  content: string
  cancelText?: string
  confirmText?: string
  closeOnClickOverlay?: boolean
  isOpened?: boolean
  onClose?: Function
  onCancel?: Function
  onConfirm?: Function
  onClickClose?: Function
  isWEB?: boolean
  mode?: ModalMode
  src?: string
  showClear?: boolean
}

const Modal = (_p, ref) => {
  useImperativeHandle(ref, () => ({ open, close }))

  const [state, setState] = useState<ModalState>({ content: '', isOpened: false })
  const {
    title = '提示',
    content,
    cancelText = '取消',
    confirmText = '确定',
    closeOnClickOverlay = true,
    children,
    className,
    isOpened,
    onClose,
    onCancel,
    onConfirm,
    onClickClose,
    isWEB = Taro.getEnv() === Taro.ENV_TYPE.WEB,
    mode = ModalMode.Normal,
    src,
    showClear,
  } = state

  const open = (props: ModalState) => {
    setState({ ...props, isOpened: true })
  }

  const close = () => {
    onClose && onClose()
    setState({
      isOpened: false,
      content: '',
      title: '提示',
      cancelText: '取消',
      confirmText: '确定',
      onCancel: undefined,
      onConfirm: undefined,
      onClickClose: undefined,
      closeOnClickOverlay: true,
      children: null,
      onClose: undefined,
      className: undefined,
    })
  }

  const handleClickOverlay = () => {
    closeOnClickOverlay && close()
  }

  const handleCancel = () => {
    onCancel && onCancel()
    close()
  }

  const handleConfirm = () => {
    onConfirm && onConfirm()
    close()
  }

  const handleClickClose = () => {
    onClickClose && onClickClose()
    close()
  }

  const handleTouchMove = (e: ITouchEvent) => {
    e.stopPropagation()
  }

  return (
    <View
      className={classNames(className, 'hd-modal', { 'hd-modal--active': isOpened })}
      onTouchMove={handleTouchMove}
    >
      <View className="hd-modal__overlay" onClick={handleClickOverlay} />
      <View className="hd-modal__container">
        {showClear && <View className="hd-modal__close at-icon at-icon-close" onClick={handleClickClose} />}
        {src && <Image src={src} mode="scaleToFill" className="hd-modal__image" />}
        {title && (
          <View
            className={classNames('hd-modal__header', {
              'hd-modal__subHeader': mode === ModalMode.WithPicture,
            })}
          >
            {title}
          </View>
        )}
        <View
          className={classNames('hd-modal__content', {
            'hd-modal__text': mode === ModalMode.WithPicture,
          })}
        >
          {isWEB ? (
            <Text dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
          ) : (
            <Text>{content}</Text>
          )}
        </View>
        {children}
        {(cancelText || confirmText) && (
          <View className="hd-modal__action">
            {cancelText && (
              <Button className="hd-modal__action-cancel" onClick={handleCancel}>
                {cancelText}
              </Button>
            )}
            {confirmText && (
              <Button className="hd-modal__action-confirm" onClick={handleConfirm}>
                {confirmText}
              </Button>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

export default React.forwardRef(Modal)
