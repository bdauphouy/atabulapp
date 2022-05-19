import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { useDidUpdate } from 'rooks'

type FilterTypes = {
  children: React.ReactNode
  open?: boolean
  className?: ''
  onToggle: (e: { isOpen: boolean }) => void
}

const Filter = ({
  children,
  open = false,
  onToggle,
  className,
}: FilterTypes) => {
  const [isOpen, setIsOpen] = useState(open)

  useDidUpdate(() => {
    onToggle({ isOpen })
  }, [isOpen])

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`${className} flex w-max cursor-pointer select-none items-center gap-6 rounded-3xl border-[1px] border-solid border-alto px-4 py-1.5 text-base font-medium text-black transition-colors duration-200 hover:border-scarlet hover:text-scarlet`}
    >
      {children}
      <RiArrowDownSLine
        className={`text-2xl transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </div>
  )
}

export default Filter
