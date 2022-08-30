import { useEffect } from 'react'
import useTimeoutFn from '@/hooks/sideEffects/useTimeout'


/**
 * 去抖函数 依赖项变化时重新倒计时,执行回调
 * @param fn 回调函数 Function
 * @param ms 延迟毫秒数 number
 * @param deps 依赖性 DependencyList
 *
 * @returns [isReady, cancel]
 * isReady 当前抖动状态 ()=> boolean | null
 * 	-	false 正在执行 pending
 * 	- true 执行完毕 called
 * 	-	null 取消执行 cancelled
 * cancel 取消执行函数 ()=> void
 */

const useDebounce = ( fn: (...args:any) => void, ms?: number,deps?:any[]) => {
    if(ms === void 0) {ms = 0}
    if(deps === void 0) {deps = []}

    const [isReady,cancel,reset] = useTimeoutFn(fn,ms)
    useEffect(reset,[reset,...deps])
    return [isReady, cancel]
}

export default useDebounce
