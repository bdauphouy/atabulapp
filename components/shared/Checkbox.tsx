import { ReactNode, useId } from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type CheckboxProps = {
  control: Control<any>
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  name: string
  className?: string
  label?: string | ReactNode
  value?: string
  isDisabled?: boolean
  isChecked?: boolean
  withUnderline?: boolean
}

const Checkbox = ({
  control,
  rules,
  name,
  className = '',
  label = '',
  value = 'true',
  isDisabled,
  isChecked,
  withUnderline,
}: CheckboxProps) => {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, name } }) => (
        <div
          className={`flex gap-4 ${className} ${
            withUnderline
              ? 'border-b-[1px] border-solid border-alto/30 pb-4'
              : ''
          }`}
        >
          <input
            id={id}
            type="checkbox"
            name={name}
            className="hidden"
            onChange={e => onChange(e.target.checked ? e.target.value : false)}
            checked={isChecked}
            value={value}
            disabled={isDisabled}
          />
          <label
            htmlFor={id}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 border-solid border-alto/60 duration-200 after:absolute after:h-4 after:w-4 after:rounded-sm after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
          ></label>
          {label && (
            <label
              htmlFor={id}
              className="flex-1 cursor-pointer text-base text-black"
            >
              {label}
            </label>
          )}
        </div>
      )}
    />
  )
}

export default Checkbox
