import { Controller, Control, RegisterOptions } from 'react-hook-form'
import { useId } from 'react'

type SwitchProps = {
  control: Control<any>
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  name: string
  isDisabled?: boolean
  className?: string
  label?: string
}

const Switch = ({
  control,
  rules,
  name,
  isDisabled = false,
  className = '',
  label = '',
}: SwitchProps) => {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, name, value } }) => (
        <div className={`flex items-center gap-4 ${className}`}>
          <input
            id={id}
            type="checkbox"
            name={name}
            checked={value}
            disabled={isDisabled}
            className="hidden"
            onChange={onChange}
          />
          <label
            htmlFor={id}
            className="relative block h-7 w-12 cursor-pointer rounded-3xl bg-scarlet duration-300 after:absolute after:top-0.5 after:h-6 after:w-6 after:translate-x-0.5 after:rounded-full after:bg-white after:transition-transform after:content-[''] label-checked:after:translate-x-[calc(100%-2px)] label-disabled:cursor-not-allowed label-disabled:bg-scarlet/50"
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

export default Switch
