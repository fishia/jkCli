import React from 'react'
import c from 'classnames'
import { View, Image } from '@tarojs/components'

import { IProps } from '@/def/common'

import './index.scss'

export interface IEmptyProps extends IProps {
  text: string
  picUrl?: string
}

const Empty: React.FC<IEmptyProps> = props => {
  const { picUrl = '', text, className, style } = props

  return (
    <View style={style} className={c(className, 'hd-empty')}>
      {picUrl && <Image className="hd-empty__image" src={picUrl} mode="scaleToFill" />}

      <View className="hd-empty__content">{text}</View>
    </View>
  )
}

export default Empty
