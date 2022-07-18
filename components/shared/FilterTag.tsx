import { ReactNode } from 'react'

type FilterTagProps = {
  children: ReactNode
  name: string
  isSelected?: boolean
  className?: string
  onChange?: () => void
  size: 'md' | 'lg'
}

const FilterTag = ({
  children,
  name,
  isSelected = false,
  className,
  onChange,
  size,
}: FilterTagProps) => {
  return (
    <div>
      <input
        id={`filter-tag-${name}`}
        type="checkbox"
        defaultChecked={isSelected}
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={`filter-tag-${name}`}
        className={`${className} ${
          size === 'lg' ? 'px-6 py-2.5 text-lg' : 'px-5 py-1.5 text-base'
        } transiton-colors flex w-max cursor-pointer select-none items-center gap-6 rounded-3xl border-[1px] border-solid border-alto/60 font-medium text-black transition-colors duration-200 hover:border-scarlet hover:text-scarlet label-checked:border-scarlet label-checked:bg-scarlet label-checked:text-white`}
      >
        {children}
      </label>
    </div>
  )
}

export default FilterTag
