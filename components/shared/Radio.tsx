import { useId } from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type RadioProps = {
  control: Control<any>
  value?: string
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  name: string
  className?: string
  label?: string
  withUnderline?: boolean
  isEditable?: boolean
  defaultEditableValue?: number
  onInput?: (value: string) => void
  onFocus?: () => void
}

const Radio = ({
  control,
  value,
  rules,
  name,
  className = '',
  label = '',
  withUnderline = false,
  isEditable = false,
  defaultEditableValue,
  onInput,
  onFocus,
}: RadioProps) => {
  const id = useId()

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, name, value: formValue } }) => (
        <div
          className={`flex gap-4 ${className} ${
            withUnderline
              ? 'border-b-[1px] border-solid border-alto/30 pb-4'
              : ''
          }`}
        >
          <input
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={value === formValue}
            className="hidden"
            onChange={onChange}
          />
          <label
            htmlFor={id}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-alto/60 duration-200 after:absolute after:h-4 after:w-4 after:rounded-full after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
          ></label>
          {label && (
            <label
              htmlFor={id}
              className="flex-1 cursor-pointer text-base text-black"
            >
              {isEditable ? (
                <input
                  type="number"
                  placeholder={label}
                  className="outline-none"
                  defaultValue={defaultEditableValue}
                  onInput={e => onInput?.((e.target as HTMLInputElement).value)}
                  onFocus={onFocus}
                />
              ) : (
                label
              )}
            </label>
          )}
        </div>
      )}
    />
  )
}

export default Radio
