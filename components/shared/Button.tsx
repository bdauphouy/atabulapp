type ButtonProps = {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  className?: string
  textColor?: 'white' | 'scarlet'
  onClick?: () => void
  submit?: boolean
  form?: string
}

const Button = ({
  children,
  variant,
  disabled = false,
  className = '',
  textColor = 'scarlet',
  onClick,
  submit = false,
  form,
}: ButtonProps) => {
  if (variant === 'tertiary') {
    return (
      <button
        form={form ? form : ''}
        type={submit ? 'submit' : 'button'}
        disabled={disabled}
        className={`${className} ${
          textColor === 'white'
            ? 'text-white hover:text-white/80'
            : 'text-scarlet hover:text-scarlet/80'
        } text-base font-medium underline underline-offset-2 transition-colors duration-300 disabled:hidden`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  const commonClasses =
    'rounded-3xl bg-black-rose font-medium text-white transition-colors duration-300 hover:bg-black-rose/80 disabled:cursor-not-allowed disabled:bg-black-rose/50'

  return (
    <button
      form={form ? form : ''}
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className={`${className} ${commonClasses} ${
        variant === 'primary' ? 'px-10 py-2.5 text-lg' : 'px-5 py-1.5 text-base'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
