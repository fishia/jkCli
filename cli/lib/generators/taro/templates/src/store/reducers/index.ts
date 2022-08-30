import { combineReducers, ReducersMapObject } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import common, { CommonProps } from './common'

import { AppDispatch, RootState } from '..'

export * from './common'

export interface RootStateType {
  common: CommonProps.CommonType
}

const reducerMap: ReducersMapObject<RootStateType> = {
  common
}

const rootReducer = combineReducers(reducerMap)

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default rootReducer
