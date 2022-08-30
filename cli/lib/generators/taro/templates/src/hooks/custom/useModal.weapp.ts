import { useCallback } from 'react'
import _ from 'lodash'
import { eventCenter, useRouter } from '@tarojs/taro'

import { modalEventKey, ModalState } from '@/components/Modal'

const useModal = () => {
  const router = useRouter()

  function showModal(options: ModalState) {
    eventCenter.trigger(router.path + modalEventKey, options)
  }

  const open = useCallback(showModal, [router.path])

  return [open, _.noop]
}

export default useModal
