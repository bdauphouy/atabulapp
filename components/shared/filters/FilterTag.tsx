import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { useDidUpdate } from 'rooks'

type FilterTypes = {
  children: React.ReactNode
  name: string
  selected?: boolean
  className?: string
  onChange?: () => void
}

const FilterDropdown = ({
  children,
  name,
  selected = false,
  className,
  onChange,
}: FilterTypes) => {
  return (
    <div>
      <input
        id={`filter-tag-${name}`}
        type="checkbox"
        checked={selected}
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={`filter-tag-${name}`}
        className={`${className} transiton-colors flex w-max cursor-pointer select-none items-center gap-6 rounded-3xl border-[1px] border-solid border-alto px-4 py-1.5 text-base font-medium text-black transition-colors duration-200 hover:border-scarlet hover:text-scarlet label-checked:border-scarlet label-checked:bg-scarlet label-checked:text-white`}
      >
        {children}
      </label>
    </div>
  )
}

export default FilterDropdown
