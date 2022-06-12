import { Controller, Control, RegisterOptions } from 'react-hook-form'
import { useId } from 'react'

type CheckboxProps = {
  control: Control<any>
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  name: string
  className?: string
  label?: string
  value?: string
}

const Checkbox = ({
  control,
  rules,
  name,
  className = '',
  label = '',
  value,
}: CheckboxProps) => {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, name } }) => (
        <div className={`flex gap-4 ${className}`}>
          <input
            id={id}
            type="checkbox"
            name={name}
            className="hidden"
            onChange={e => onChange(e.target.checked ? e.target.value : false)}
            value={value}
          />
          <label
            htmlFor={id}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 border-solid border-alto duration-200 after:absolute after:h-4 after:w-4 after:rounded-sm after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
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
