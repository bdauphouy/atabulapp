type RadioProps = {
  value: string
  name: string
  checked: boolean
  className?: string
  label?: string
  onChange: () => void
}

const Radio = ({
  value,
  name,
  checked,
  className = '',
  label = '',
  onChange,
}: RadioProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      <input
        id={`radio-${value}`}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={`radio-${value}`}
        className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border-2 border-solid border-alto duration-100 after:absolute after:h-4 after:w-4 after:rounded-full after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
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
  )
}

export default Radio
