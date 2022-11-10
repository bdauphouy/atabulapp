import {
  Dispatch,
  SetStateAction,
  useDebugValue,
  useEffect,
  useState,
} from 'react'

const useLocalStorage = <S,>(
  key: string,
  initialState?: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, () => void] => {
  const [state, setState] = useState<S>(initialState as S)
  useDebugValue(state)

  useEffect(() => {
    const item = localStorage.getItem(key)
    if (item) setState(parse(item))
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  const removeData = () => {
    localStorage.removeItem(key)
  }

  return [state, setState, removeData]
}

const parse = (value: string) => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export default useLocalStorage
