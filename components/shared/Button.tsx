type ButtonProps = {
  children: React.ReactNode
  action: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const Button = ({
  children,
  action,
  disabled = false,
  className,
  onClick,
}: ButtonProps) => {
  if (action === 'primary') {
    return (
      <button
        disabled={disabled}
        className={`${className} rounded-3xl bg-black-rose px-10 py-2.5 text-lg font-medium text-white-rock disabled:bg-black-rose/50`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  } else {
    return (
      <button
        disabled={disabled}
        className={`${className} rounded-3xl bg-black-rose px-5 py-1.5 text-base font-medium text-white-rock disabled:bg-black-rose/50 disabled:bg-black-rose`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}

export default Button
