import { Controller, Control } from 'react-hook-form'
import { useId } from 'react'

type CheckboxProps = {
  control: Control<any>
  rules?: any
  name: string
  className?: string
  label?: string
}

const Checkbox = ({
  control,
  rules,
  name,
  className = '',
  label = '',
}: CheckboxProps) => {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, name, value } }) => (
        <div className={`flex gap-4 ${className}`}>
          <input
            id={id}
            type="checkbox"
            name={name}
            checked={value}
            className="hidden"
            onChange={onChange}
          />
          <label
            htmlFor={id}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 border-solid border-alto duration-200 after:absolute after:h-4 after:w-4 after:rounded-sm after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
          ></label>
          {label && (
            <label htmlFor={id} className="flex-1 text-base text-black">
              {label}
            </label>
          )}
        </div>
      )}
    />
  )
}

export default Checkbox
