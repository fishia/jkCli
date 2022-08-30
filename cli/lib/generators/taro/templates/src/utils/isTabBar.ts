const routerConfig = require('@/config/router.weapp')

const isTabBar = (url: string) => {
  return routerConfig.tabBar.list.some((item) => (
    url && url.includes(item.pagePath)
  ))
}

export default isTabBar;
