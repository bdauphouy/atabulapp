import { ReactNode } from 'react'
import { RiNavigationLine, RiRestaurantLine } from 'react-icons/ri'

type SearchTagProps = {
  children: ReactNode
  type?: 'place' | 'near'
  withUnderline?: boolean
}

const SearchTag = ({
  children,
  type = 'place',
  withUnderline = false,
}: SearchTagProps) => {
  return (
    <div
      className={`${
        withUnderline ? 'border-b-[1px] border-alto/60 pb-4' : ''
      } flex cursor-pointer items-center gap-4 text-lg font-medium text-black`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-solid border-scarlet pt-0.5 pr-0.5">
        {type === 'near' ? (
          <RiNavigationLine size={30} className="rotate-90 text-scarlet" />
        ) : (
          <RiRestaurantLine size={30} className="text-scarlet" />
        )}
      </div>
      {children}
    </div>
  )
}

export default SearchTag
