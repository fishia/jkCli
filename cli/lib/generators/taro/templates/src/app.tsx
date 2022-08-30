import { Component } from 'react'
import { Provider } from 'react-redux'
import { jumpOldUrl } from '@/utils/utils'
import appStore from '@/store'
import MainLayout from '@/layout/MainLayout'
import ErrorBoundary from '@/layout/ErrorBoundary'

import './app.scss'


class App extends Component {
  onPageNotFound({ path }) {
    jumpOldUrl(path)
  }

  onLaunch(options) {
  
  }
  componentDidShow(options) {
  }

  componentDidHide() {
  }

  // 微信小程序中此函数无法在页面中渲染节点，所以不能在此处引入 MainLayout，而要在每个页面中引入
  render() {
    return (
      <Provider store={appStore}>
        <ErrorBoundary>
          {process.env.TARO_ENV === 'h5' ? (
            <MainLayout>{this.props.children}</MainLayout>
          ) : (
            this.props.children
          )}
        </ErrorBoundary>
      </Provider>
    )
  }
}

export default App
