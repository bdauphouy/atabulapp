import { AnimatePresence, motion } from 'framer-motion'
import { RiArrowDownSLine } from 'react-icons/ri'

type FiltersDropdownProps = {
  value: string
  isOpen: boolean
  onToggle: () => void
  onChange?: (value: string) => void
  className?: string
  size: 'md' | 'lg'
  options?: {
    label: string
    value: string
  }[]
}

const FiltersDropdown = ({
  value,
  isOpen,
  onToggle,
  onChange,
  className = '',
  size,
  options = [],
}: FiltersDropdownProps) => {
  return (
    <div className="relative">
      <div
        onClick={onToggle}
        className={`${className} ${
          size === 'lg' ? 'px-6 py-2.5 text-lg' : 'px-5 py-1.5 text-base'
        } ${
          isOpen && options.length > 0 ? 'rounded-t-xl' : 'rounded-3xl'
        } flex w-max cursor-pointer select-none items-center gap-6 border-[1px] border-solid border-alto/60 font-medium text-black transition-[border-radius,color] duration-200 hover:border-scarlet hover:text-scarlet`}
      >
        {value}
        <RiArrowDownSLine
          size={size === 'lg' ? 26 : 20}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {options.length > 0 && (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="absolute z-50 w-max min-w-full cursor-pointer rounded-b-xl border-[1px] border-t-0 border-solid border-alto/60 bg-white text-lg"
            >
              {options.map(option => (
                <li
                  key={option.value}
                  className="px-4 py-2.5 transition-colors duration-200 hover:bg-alto/20"
                  onClick={() => {
                    onChange(option.value)
                    onToggle()
                  }}
                >
                  {option.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default FiltersDropdown
