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
          <div>
            Repas
            <p className="text-sm text-gray">{selectedFilters.mealsString}</p>
          </div>
        </ArrowCta>
        <ArrowCta
          onClick={() => setCurrentCategory('Type de cuisine')}
          variant="lg"
        >
          <div>
            Types de cuisine
            <p className="text-sm text-gray">
              {selectedFilters.typesOfCuisineString}
            </p>
          </div>
        </ArrowCta>
        <ArrowCta
          onClick={() => setCurrentCategory('Date')}
          variant="lg"
          withUnderline={false}
        >
          <div>
            Dates
            <p className="text-sm text-gray">{selectedFilters.datesString}</p>
          </div>
        </ArrowCta>
      </div>
    </div>
  )
}

export default FiltersMenu
