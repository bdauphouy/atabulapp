type ButtonProps = {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const Button = ({
  children,
  variant,
  disabled = false,
  className = '',
  onClick,
}: ButtonProps) => {
  if (variant === 'tertiary') {
    return (
      <button
        disabled={disabled}
        className="text-base font-medium text-scarlet underline underline-offset-2 transition-colors duration-300 hover:text-scarlet/80 disabled:hidden"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  const buttonCommonClasses =
    'rounded-3xl bg-black-rose font-medium text-white transition-colors duration-300 hover:bg-black-rose/80 disabled:cursor-not-allowed disabled:bg-black-rose/50'

  return (
    <button
      disabled={disabled}
      className={`${className} ${buttonCommonClasses} ${
        variant === 'primary' ? 'px-10 py-2.5 text-lg' : 'px-5 py-1.5 text-base'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
