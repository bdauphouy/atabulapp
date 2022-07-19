import { ReactNode } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

type FiltersDropdownProps = {
  children: ReactNode
  isOpen: boolean
  onToggle: () => void
  className?: string
  size: 'md' | 'lg'
}

const FiltersDropdown = ({
  children,
  isOpen,
  onToggle,
  className = '',
  size,
}: FiltersDropdownProps) => {
  return (
    <div
      onClick={onToggle}
      className={`${className} ${
        size === 'lg' ? 'px-6 py-2.5 text-lg' : 'px-5 py-1.5 text-base'
      } flex w-max cursor-pointer select-none items-center gap-6 rounded-3xl border-[1px] border-solid border-alto/60 font-medium text-black transition-colors duration-200 hover:border-scarlet hover:text-scarlet`}
    >
      {children}
      <RiArrowDownSLine
        size={size === 'lg' ? 26 : 20}
        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </div>
  )
}

export default FiltersDropdown
