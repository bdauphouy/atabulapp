type CheckboxProps = {
  name: string
  checked: boolean
  className?: string
  label?: string
  onChange: () => void
}

const Checkbox = ({
  name,
  checked,
  className = '',
  label = '',
  onChange,
}: CheckboxProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      <input
        id={`checkbox-${name}`}
        type="checkbox"
        checked={checked}
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={`checkbox-${name}`}
        className="grid h-6 w-6 cursor-pointer place-items-center rounded-md border-2 border-solid border-alto duration-100 after:absolute after:h-4 after:w-4 after:rounded-sm after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
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

export default Checkbox
