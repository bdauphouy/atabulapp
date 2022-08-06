import ArrowCta from '@/components/shared/ArrowCta'
import { FilterCategory, SelectedFilters } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

type FiltersMenuProps = {
  selectedFilters: SelectedFilters
  setCurrentCategory: Dispatch<SetStateAction<FilterCategory>>
}

const FiltersMenu = ({
  selectedFilters,
  setCurrentCategory,
}: FiltersMenuProps) => {
  return (
    <div className="mt-6 w-full">
      <div className="flex flex-col">
        <ArrowCta
          onClick={() => setCurrentCategory('Distinctions')}
          variant="lg"
        >
          <div>
            Distinctions
            <p className="text-sm text-gray">{selectedFilters.honorsString}</p>
          </div>
        </ArrowCta>
        <ArrowCta onClick={() => setCurrentCategory('Repas')} variant="lg">
          Repas
        </ArrowCta>
        <ArrowCta
          onClick={() => setCurrentCategory('Type de cuisine')}
          variant="lg"
        >
          Type de cuisine
        </ArrowCta>
        <ArrowCta
          onClick={() => setCurrentCategory('Date')}
          variant="lg"
          withUnderline={false}
        >
          Date
        </ArrowCta>
      </div>
    </div>
  )
}

export default FiltersMenu
