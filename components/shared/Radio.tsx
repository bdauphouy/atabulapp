type RadioProps = {
  value: string
  name: string
  checked: boolean
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = ({
  value,
  name,
  checked,
  className = '',
  onChange,
}: RadioProps) => {
  return (
    <>
      <input
        id={`radio-${value}`}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        className={`${className} hidden`}
        onChange={onChange}
      />
      <label
        htmlFor={`radio-${value}`}
        className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border-2 border-solid border-alto duration-100 after:absolute after:h-4 after:w-4 after:rounded-full after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
      ></label>
    </>
  )
}

export default Radio
