import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
/**
 * 窗口滚动副作用
 * @returns 当前滚动{x:scrollLeft,y:scrollTop}
 */
const useWindowScroll = () => {
  const [state, setState] = useState({
    x: isBrowser ? window.pageXOffset : 0,
    y: isBrowser ? window.pageYOffset : 0,
  })
  const winHeight = window.outerHeight
  const winWidth = window.outerWidth
  useEffect(() => {
    const handler = () => {
      setState(function (prevState) {
        let pageXOffset = window.pageXOffset
        let pageYOffset = window.pageYOffset
        return prevState.x !== pageXOffset || prevState.y !== pageYOffset
          ? {
              x: pageXOffset,
              y: pageYOffset,
            }
          : prevState
      })
    }
    handler()
    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    })
    return function () {
      window.removeEventListener('scroll', handler)
    }
  }, [winHeight])
  return state
}

export default useWindowScroll
