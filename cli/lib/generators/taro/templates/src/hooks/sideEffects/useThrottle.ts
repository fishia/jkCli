import { useEffect, useRef, useState } from 'react'
import useUnmount from '../lifeCycle/useUnmount'

/**
 * 节流函数，根据依赖性的变化，在一定时间内执行一次回调函数
 * @param fn 回调函数 (...args: any[]) => any
 * @param ms 时间间隔 number
 * @param args 依赖数组
 * @returns 回调函数返回的值
 */
// eslint-disable-next-line @typescript-eslint/no-shadow
export function useThrottleFn(fn: (...args: any[]) => any, ms?: number, args?: any[]) {
  if (ms === void 0) {
    ms = 200
  }
  if (args === void 0) {
    args = []
  }

  const [state, setState] = useState(null)
  const timeout = useRef<NodeJS.Timeout | undefined>()
  const nextArgs = useRef<any[]>()
  useEffect(() => {
    if (!timeout.current) {
      setState(fn.apply(void 0, args))
      const timeoutCallback_1 = () => {
        if (nextArgs.current) {
          setState(fn.apply(void 0, nextArgs.current))
          nextArgs.current = undefined
          timeout.current = setTimeout(timeoutCallback_1, ms)
        } else {
          timeout.current = undefined
        }
      }
      timeout.current = setTimeout(timeoutCallback_1, ms)
    } else {
      nextArgs.current = args
    }
  }, [fn, args, ms])

  useUnmount(() => {
    timeout.current && clearTimeout(timeout.current)
  })
  return state
}

/**
 * 节流函数，根据依赖值的变化，在一定时间内执行一次回调函数
 * @param value 依赖值 any
 * @param ms 时间间隔 number
 * @returns 依赖值
 */
export function useThrottle(value: any, ms?: number) {
  if (ms === void 0) {
    ms = 200
  }

  const [state, setState] = useState(value)
  const timeout = useRef<NodeJS.Timeout | undefined>()
  const nextValue = useRef<any[] | null>(null)
  const hasNextValue = useRef(false)
  useEffect(() => {
    if (!timeout.current) {
      setState(value)
      const timeoutCallback_1 = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false
          setState(nextValue.current)
          timeout.current = setTimeout(timeoutCallback_1, ms)
        } else {
          timeout.current = undefined
        }
      }
      timeout.current = setTimeout(timeoutCallback_1, ms)
    } else {
      nextValue.current = value
      hasNextValue.current = true
    }
  }, [value, ms])

  useUnmount(() => {
    timeout.current && clearTimeout(timeout.current)
  })
  return state
}
