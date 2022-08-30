import { useEffect, useState, MutableRefObject } from 'react'

/**
 * Dom元素滚动副作用
 * @param ref React虚拟Dom引用
 * @returns 当前滚动{x:scrollLeft,y:scrollTop}
 */
const useScroll = (ref: MutableRefObject<any>) => {
  if (process.env.ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      console.error('`useScroll` expects a single ref argument.')
    }
  }
  const [state, setState] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const node = ref.current

    const handler = () => {
      if (node) {
        setState({
          x: node.scrollLeft,
          y: node.scrollTop,
        })
      }
    }
    if (node) {
      node.addEventListener('scroll', handler, {
        capture: false,
        passive: true,
      })
    }
    return function () {
      if (node) {
        node.removeEventListener('scroll', handler, {
          capture: false,
          passive: true,
        })
      }
    }
  }, [ref])
  return state
}

export default useScroll
