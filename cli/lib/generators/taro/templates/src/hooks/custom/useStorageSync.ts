import { getStorageSync, removeStorageSync, setStorageSync } from "@tarojs/taro"
import { useCallback, useLayoutEffect, useRef, useState,useMemo } from "react"


export declare type OptionsType<T> = {
    raw: false
    serializer: (value: T) => string
    deserializer: (value: string) => T
}

/**
 * taro数据缓存管理副作用函数
 * @param key 键值 string 
 * @param initialValue 只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
 * @param options OptionsType
 * @returns [当前值,设置方法,清除方法]
 */
const useStorageSync = (key:string, initialValue:any, options?:OptionsType<any>) => {
    const deserializer = useMemo(() => {
        return options ? options.raw ? value => value : options.deserializer : JSON.parse
    }, [options])
    
    const initializer = useRef((k:string) => {
        try {
            const serializer = options ? options.raw ? String : options.serializer :JSON.stringify
            const storageValue = getStorageSync(k)
            if(storageValue !== null) {
                return deserializer(storageValue)
            }else {
                initialValue && setStorageSync(k, serializer(initialValue))
                return initialValue
            }
        }
        catch(error) {
            return initialValue
        }
    })
    const [state, setState] = useState(() => {initializer.current(key)})
    useLayoutEffect(()=> {
        return setState(initializer.current(key))
    },[key])

    const set = useCallback(
        (valOrFunc) => {
            try {
                const newState = typeof valOrFunc === 'function' ? valOrFunc(state) : valOrFunc
                if(typeof newState === 'undefined') return;
                let value:string | undefined = void 0
                if (options)
                if (options.raw)
                    if (typeof newState === 'string')
                        value = newState;
                    else
                        value = JSON.stringify(newState);
                else if (options.serializer)
                    value = options.serializer(newState);
                else
                    value = JSON.stringify(newState);
            else
                value = JSON.stringify(newState);
                setStorageSync(key,value)
                setState(deserializer(value))
            }catch(error)
            {}
        }, [key, setState,deserializer,state,options]
    )

    const remove = useCallback(
        () => {
           try{
            removeStorageSync(key)
            setState(undefined)
           }catch(error) {}
        },[key, setState]
    )

    return [state, set, remove];
}
export default useStorageSync