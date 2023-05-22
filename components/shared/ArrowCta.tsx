import { ReactNode } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type ArrowCtaProps = {
  children: ReactNode
  onClick: () => void
  withUnderline?: boolean
  variant: 'md' | 'lg'
  isActive?: boolean
}

const ArrowCta = ({
  children,
  onClick,
  withUnderline = true,
  variant,
  isActive = true,
}: ArrowCtaProps) => {
  return (
    <div
      className={`group flex cursor-pointer items-center justify-between py-4 ${
        withUnderline ? 'border-b-2 border-solid border-alto/30' : ''
      }`}
      onClick={onClick}
    >
      <div
        className={`flex items-center gap-4 ${
          isActive ? 'text-black' : 'text-gray'
        } ${variant === 'md' ? 'text-base' : 'text-lg font-medium'}`}
      >
        {children}
      </div>
      <RiArrowRightSLine
        size={28}
        className="transition-transform xl:group-hover:translate-x-2"
      />
    </div>
  )
}

export default ArrowCta
