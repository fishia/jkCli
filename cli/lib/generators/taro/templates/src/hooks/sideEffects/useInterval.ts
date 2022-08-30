import { useEffect, useRef } from 'react'

const useInterval = (callback, delay: number | null) => {
  const saveCallback = useRef(() => {})
  useEffect(() => {
    saveCallback.current = callback
  })
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => saveCallback.current(), delay)
      return () => {
        return clearInterval(interval)
      }
    }
    return undefined
  }, [delay])
}
export default useInterval
