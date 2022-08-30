import { ModalState } from '@/components/Modal'
import useModal from './useModal'

export interface IUseShowModalProps {
  mode: 'then' | 'thenCatch'
}

export interface IShowModalProps extends ModalState {}

function useShowModal(p?: IUseShowModalProps): Func1<IShowModalProps, Promise<boolean | 0 | void>> {
  const { mode = 'then' } = p || {}
  const [modal] = useModal()

  return props => {
    if (mode === 'thenCatch') {
      return new Promise((res, rej) => {
        modal({
          ...props,
          onConfirm: () => res(),
          onCancel: () => rej(),
          onClose: () => rej(),
        })
      })
    }

    return new Promise(res => {
      modal({
        ...props,
        onConfirm: () => res(true),
        onCancel: () => res(false),
        onClose: () => res(0),
      })
    })
  }
}

export default useShowModal
