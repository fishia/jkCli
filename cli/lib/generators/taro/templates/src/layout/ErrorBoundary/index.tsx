import { Component } from 'react'
import { redirectTo } from '@tarojs/taro'

import { IProps } from '@/def/common'
import Error from '@/h5/error'

export interface IState {
  hasError?: boolean
}

export default class ErrorBoundary extends Component<IProps, IState> {
  static getDerivedStateFromError(_error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(_error, _errorInfo) {
    this.setState({
      hasError: true,
    })
  }

  render() {
    if (this.state.hasError) {
      if (process.env.TARO_ENV === 'h5') {
        return <Error />
      } else {
        redirectTo({ url: '/weapp/general/error/index' })
      }
    }
    return this.props.children
  }
}
