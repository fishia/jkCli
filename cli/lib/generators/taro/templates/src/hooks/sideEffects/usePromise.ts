import { useCallback } from 'react'
import useMountedState from '../lifeCycle/useMountedState'

const usePromise = () => {
  const isMounted = useMountedState()
  return useCallback(promise => {
    return new Promise((resolve, reject) => {
      const onValue = value => {
        isMounted() && resolve(value)
      }
      const onError = error => {
        isMounted() && reject(error)
      }
      promise.then(onValue, onError)
    })
  }, [isMounted])
}
export default usePromise
