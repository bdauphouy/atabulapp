import { Controller, Control } from 'react-hook-form'

type RadioProps = {
  control: Control<any>
  value: string
  rules?: any
  name: string
  className?: string
  label?: string
}

const Radio = ({
  control,
  value,
  rules,
  name,
  className = '',
  label = '',
}: RadioProps) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange, name, value: formValue } }) => (
        <div className={`flex gap-4 ${className}`}>
          <input
            id={`radio-${value}`}
            type="radio"
            name={name}
            value={value}
            checked={value === formValue}
            className="hidden"
            onChange={onChange}
          />
          <label
            htmlFor={`radio-${value}`}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-alto duration-200 after:absolute after:h-4 after:w-4 after:rounded-full after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
          ></label>
          {label && (
            <label
              htmlFor={`radio-${value}`}
              className="flex-1 text-base text-black"
            >
              {label}
            </label>
          )}
        </div>
      )}
    />
  )
}

export default Radio
