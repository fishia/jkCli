import { useEffect, useState,MutableRefObject } from "react"

/**
 * 判断DOM是否仍在滚动
 * @param ref HTMLElementRef
 * @returns state boolean
 */
const useScrolling = (ref:MutableRefObject<HTMLElement>) => {
    const [state, setState] = useState(false)
    useEffect(() => {
      const node = ref.current
        if(node) {
            let scrollingTimeout
            const handleScroollEnd = () => {
                setState(false)
            }
            const handleScroll = () => {
                setState(true)
                clearTimeout(scrollingTimeout)
                scrollingTimeout = setTimeout(handleScroollEnd,150)
            }
            // false默认。冒泡阶段。
            node.addEventListener('scroll',handleScroll,false)
            return () => {
                if (node) {
                  node.removeEventListener('scroll',handleScroll,false)
                }
            }
        }
        return function () {}
    },[ref])
    return state
}
export default useScrolling
