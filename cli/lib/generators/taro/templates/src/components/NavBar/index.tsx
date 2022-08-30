import React from 'react'
import c from 'classnames'
import { navigateBack } from '@tarojs/taro'
import { AtNavBar } from 'taro-ui'

import { IProps } from '@/def/common'

import './index.scss'

export interface INavBarProps extends IProps {
  title?: string
  border?: boolean
  onClickLeftIcon?(): void
}

const NavBar: React.FC<INavBarProps> = props => {
  const { title = '', style, className, border = false, onClickLeftIcon = navigateBack } = props

  return (
    <AtNavBar
      className={c('hd-navbar', className)}
      customStyle={style}
      title={title}
      border={border}
      leftIconType="chevron-left"
      onClickLeftIcon={onClickLeftIcon as any}
      color="#000"
      fixed
    />
  )
}

export default NavBar
