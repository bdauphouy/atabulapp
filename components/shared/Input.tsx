import { useState, useRef, useId } from 'react'
import { useDidUpdate } from 'rooks'
import {
  Controller,
  Control,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form'

type InputTextProps = {
  control: Control<any>
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  setValue: UseFormSetValue<any>
  options?: string[]
  name: string
  placeholder: string
  className?: string
  isDisabled?: boolean
  isMandatory?: boolean
  isDateInput?: boolean
  isPasswordInput?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

const Input = ({
  control,
  rules,
  setValue,
  options = [],
  name,
  placeholder,
  className = '',
  isDisabled = false,
  isMandatory = false,
  isDateInput = false,
  isPasswordInput = false,
  onFocus,
  onBlur,
}: InputTextProps) => {
  const defaultValue = control._defaultValues[name]

  const id = useId()

  const [isEmpty, setIsEmpty] = useState(
    defaultValue?.length === 0 || defaultValue?.length === undefined,
  )
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [isOptionsShown, setIsOptionsShown] = useState(false)
  const [focusedOption, setFocusedOption] = useState<number>()
  const [entryLength, setEntryLength] = useState(defaultValue?.length || 0)

  const inputRef = useRef<HTMLInputElement>()
  const optionListRef = useRef<HTMLUListElement>()
  const focusedOptionRef = useRef<HTMLLIElement>()

  const filter = (options: string[], entry: string) => {
    return options.filter(option =>
      option.toLowerCase().includes(entry.toLowerCase()),
    )
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur()

    setIsEmpty(e.target.value.length === 0)
    setIsOptionsShown(false)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    if (isDateInput && entryLength > 9) {
      inputValue = inputValue.slice(0, -1)
    }

    setEntryLength(inputValue.length)
    setIsOptionsShown(true)
    setFilteredOptions(filter(options, inputValue))
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const option = (e.target as HTMLLIElement).innerText

    setIsOptionsShown(false)
    setIsEmpty(option.length === 0)
    setValue(name, option)

    inputRef.current.value = option
  }

  const handleFocus = () => {
    if (onFocus) onFocus()

    setIsOptionsShown(options.length > 0)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    const option = (e.target as HTMLLIElement).innerText

    setFocusedOption(filteredOptions.indexOf(option))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (options.length === 0) return

    switch (e.key) {
      case 'ArrowUp':
        setFocusedOption(
          !focusedOption ? filteredOptions.length - 1 : focusedOption - 1,
        )

        break
      case 'ArrowDown':
        setFocusedOption(
          focusedOption === filteredOptions.length - 1 ||
            focusedOption === undefined
            ? 0
            : focusedOption + 1,
        )

        break
      case 'Enter':
        e.preventDefault()

        const option = filteredOptions[focusedOption]

        setIsOptionsShown(false)
        setIsEmpty(option.length === 0)
        setValue(name, option)

        inputRef.current.value = option

        break
      default:
        break
    }
  }

  useDidUpdate(() => {
    if (focusedOptionRef.current) {
      if (!focusedOptionRef.current.matches(':hover')) {
        focusedOptionRef.current.scrollIntoView()
      }
    }
  }, [focusedOption])

  useDidUpdate(() => {
    const inputValue = inputRef.current.value

    if (isDateInput) {
      if (entryLength === 2 || entryLength === 5) {
        inputRef.current.value += '/'
      } else if (entryLength === 3 || entryLength === 6) {
        inputRef.current.value = inputValue.slice(0, -1)
      }
    }
  }, [entryLength])

  useDidUpdate(() => {
    if (defaultValue && options.length > 0) {
      setFilteredOptions(filter(options, defaultValue))
    }
  }, [0])

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, name, value } }) => (
        <div
          onKeyDown={handleKeyDown}
          className={`${className} min-w-60 relative w-full border-b-[1px] border-solid border-alto/60`}
        >
          <input
            onChange={onChange}
            onBlur={handleBlur}
            onInput={handleInput}
            onFocus={handleFocus}
            name={name}
            maxLength={isDateInput ? 10 : null}
            defaultValue={value}
            id={id}
            disabled={isDisabled}
            type={isPasswordInput ? 'password' : 'text'}
            placeholder={placeholder}
            ref={inputRef}
            className="w-full py-3 text-base text-black outline-none placeholder:text-white/0 disabled:bg-white"
          />
          <label
            htmlFor={id}
            className={`${
              isEmpty
                ? 'top-1/2 -translate-y-1/2 text-base text-gray'
                : 'top-0 -translate-y-2/3 text-sm text-black'
            } absolute left-0 cursor-text transition-[top,color,font-size,transform] duration-200 label-focus:top-0 label-focus:-translate-y-2/3 label-focus:cursor-default label-focus:text-sm label-focus:text-black`}
          >
            {placeholder}{' '}
            {isMandatory ? <span className="text-scarlet">*</span> : ''}
          </label>

          {isOptionsShown && (
            <ul
              ref={optionListRef}
              className="absolute top-full left-0 z-10 max-h-[220px] w-full overflow-auto rounded-b-md bg-white shadow-md"
            >
              {filteredOptions.map((option, i) => (
                <li
                  onClick={handleClick}
                  onMouseDown={handleMouseDown}
                  onMouseOver={handleMouseOver}
                  key={i}
                  ref={focusedOption === i ? focusedOptionRef : null}
                  className={`${
                    focusedOption === i ? 'bg-scarlet/20 text-scarlet' : ''
                  } w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2.5 text-left outline-none transition-colors duration-200`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    />
  )
}

export default Input
