import React from 'react'
import c from 'classnames'
import { View } from '@tarojs/components'

import { IProps } from '@/def/common'
import NavBar from '@/components/NavBar'

import './index.scss'

export interface ILayoutProps extends IProps {
  navBarTitle: string
  border?: boolean
}

const NavLayout: React.FC<ILayoutProps> = props => {
  const { style, className, navBarTitle, children, border = false } = props

  return (
    <View className={c('hd-layout__navbar', className)} style={style}>
      <NavBar title={navBarTitle} border={border} />
      {children}
    </View>
  )
}

export default NavLayout
