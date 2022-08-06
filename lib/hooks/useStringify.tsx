import { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

const useStringify = (
  name: string,
  watchValue: [(boolean | string)[]],
  setValue?: UseFormSetValue<any>,
  callback?: (value: number) => void,
) => {
  const [stringifiedValue, setStringifiedValue] = useState('')

  useEffect(() => {
    if (!watchValue[0]) return

    const filteredFields = watchValue[0].filter(
      field => typeof field === 'string',
    )

    const formatedFields = filteredFields.slice(0, 2).join(', ')

    const shorterFields =
      filteredFields.length > 2
        ? formatedFields + ` +${filteredFields.length - 2}`
        : formatedFields

    setStringifiedValue(shorterFields)

    callback && callback(filteredFields.length)

    setValue && setValue(name, shorterFields)
  }, [callback, name, watchValue, setValue])

  return stringifiedValue
}

export default useStringify
