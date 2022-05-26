import Spin from '@/components/shared/Spin'

type ButtonProps = {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  className?: string
  textColor?: 'white' | 'scarlet'
  onClick?: () => void
  submit?: boolean
  form?: string
  loading?: boolean
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
  loading = false,
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
      className={`flex items-center ${className} ${commonClasses} ${
        variant === 'primary'
          ? 'gap-3 px-10 py-2.5 text-lg'
          : 'gap-2 px-5 py-1.5 text-base'
      }`}
      onClick={onClick}
    >
      {loading && <Spin size={variant === 'primary' ? 18 : 12} />}
      {children}
    </button>
  )
}

export default Button
