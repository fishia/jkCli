import { CommonProps } from '../reducers/common'

export enum CommonActionType {
  SET_MODAL = 'SET_MODAL',
  SET_TOAST = 'SET_TOAST',
  SET_LOGINPOPUP = 'SET_LOGINPOPUP',
  SET_FULLSCREENPOPUP = 'SET_FULLSCREENPOPUP',
  SET_FIXEDBOTTOMPOPUP = 'SET_FIXEDBOTTOMPOPUP',
  SET_REFRESHHOMEPAGE = 'SET_REFRESHHOMEPAGE',
  SET_CURRENT_TAB_INDEX = 'SET_CURRENT_TAB_INDEX',
}
export function setModalRef(modalRef: CommonProps.ModalRefType) {
  return {
    type: CommonActionType.SET_MODAL,
    modalRef,
  }
}

export function setToastRef(toastRef: CommonProps.ToastRefType) {
  return {
    type: CommonActionType.SET_TOAST,
    toastRef,
  }
}
