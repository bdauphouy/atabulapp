import Spin from '@/components/shared/Spin'
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant: 'primary' | 'secondary' | 'tertiary'
  isDisabled?: boolean
  className?: string
  textColor?: 'white' | 'scarlet'
  onClick?: () => void
  isSubmit?: boolean
  form?: string
  isLoading?: boolean
}

const Button = ({
  children,
  variant,
  isDisabled = false,
  className = '',
  textColor = 'scarlet',
  onClick,
  isSubmit = false,
  form,
  isLoading = false,
}: ButtonProps) => {
  if (variant === 'tertiary') {
    return (
      <button
        form={form && form}
        type={isSubmit ? 'submit' : 'button'}
        disabled={isDisabled}
        className={`${className} ${
          textColor === 'white'
            ? 'text-white hover:text-white/80'
            : 'text-scarlet hover:text-scarlet/80'
        } flex items-center gap-3 text-base font-medium underline underline-offset-2 transition-colors duration-300 disabled:hidden`}
        onClick={onClick}
      >
        {children}
        {isLoading && <Spin color="scarlet" size={12} />}
      </button>
    )
  }

  const commonClasses =
    'rounded-3xl bg-black-rose font-medium text-white transition-colors duration-300 hover:bg-black-rose/80 disabled:cursor-not-allowed disabled:bg-black-rose/50'

  return (
    <button
      form={form ? form : ''}
      type={isSubmit ? 'submit' : 'button'}
      disabled={isDisabled}
      className={`flex items-center ${className} ${commonClasses} ${
        variant === 'primary'
          ? 'gap-3 px-6 py-2.5 text-lg'
          : 'gap-2 px-5 py-1.5 text-base'
      }`}
      onClick={onClick}
    >
      {isLoading && <Spin size={variant === 'primary' ? 18 : 12} />}
      {children}
    </button>
  )
}

export default Button
