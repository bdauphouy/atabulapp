type SwitchProps = {
  name: string
  on: boolean
  disabled?: boolean
  className?: string
  label?: string
  onChange: () => void
}

const Switch = ({
  name,
  on,
  disabled = false,
  className = '',
  label = '',
  onChange,
}: SwitchProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <input
        id={`checkbox-${name}`}
        type="checkbox"
        name={name}
        checked={on}
        disabled={disabled}
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={`checkbox-${name}`}
        className="relative block h-7 w-12 cursor-pointer rounded-3xl bg-scarlet duration-300 after:absolute after:top-0.5 after:h-6 after:w-6 after:translate-x-0.5 after:rounded-full after:bg-white after:transition-transform after:content-[''] label-checked:after:translate-x-[calc(100%-2px)] label-disabled:cursor-not-allowed label-disabled:bg-scarlet/50"
      ></label>
      {label && (
        <label
          htmlFor={`checkbox-${name}`}
          className="flex-1 text-base text-black"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Switch
