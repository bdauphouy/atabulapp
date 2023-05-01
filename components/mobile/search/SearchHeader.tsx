import FiltersDropdown from '@/components/shared/FiltersDropdown'
import FilterTag from '@/components/shared/FilterTag'
import FormFooter from '@/components/shared/FormFooter'
import { SearchContext } from '@/contexts/SearchContext'
import useStringify from '@/lib/hooks/useStringify'
import { IExploreFiltersForm } from '@/lib/interfaces'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FiltersBottomSheet from '../explore/FiltersBottomSheet'

const SearchHeader = ({ children }) => {
  const { setFilters, filters, setIsLastMinute, ...searchData } =
    useContext(SearchContext)

  const { control, handleSubmit, watch, setValue } =
    useForm<IExploreFiltersForm>({
      defaultValues: {
        honors: filters.honors,
        meals: filters.meals,
        typesOfCuisine: filters.typesOfCuisine,
        dates: filters.dates,
      },
    })

  const [isFiltersDropdownOpen, setIsFiltersDropdownOpen] = useState(false)

  const watchFilters = watch(['honors', 'meals', 'typesOfCuisine', 'dates'])

  const honorsString = useStringify('honorsString', watchFilters[0])
  const mealsString = useStringify('mealsString', watchFilters[1])
  const typesOfCuisineString = useStringify(
    'typesOfCuisineString',
    watchFilters[2],
  )
  const datesString = useStringify('datesString', watchFilters[3])

  useEffect(() => {
    console.log(watchFilters)
  }, [watchFilters])

  const onSubmit: SubmitHandler<IExploreFiltersForm> = data => {
    console.log('Search...')
  }

  return (
    <form
      id="explore-filters-form"
      className="flex flex-col gap-3 px-5 pt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
      <div className="flex flex-wrap gap-3">
        <FiltersDropdown
          size="md"
          isOpen={isFiltersDropdownOpen}
          onToggle={() =>
            setIsFiltersDropdownOpen(
              isFiltersDropdownOpen => !isFiltersDropdownOpen,
            )
          }
          value="Filtres"
        />
        <FiltersBottomSheet
          control={control}
          isOpen={isFiltersDropdownOpen}
          setIsOpen={setIsFiltersDropdownOpen}
          selectedFilters={{
            honorsString,
            mealsString,
            typesOfCuisineString,
            datesString,
          }}
        >
          {isFiltersDropdownOpen && (
            <FormFooter
              formId="explore-filters-form"
              footerLeftButton={{
                text: 'Tout effacer',
                customAction: () => setValue('honors', []),
              }}
              footerRightButton={{
                text: 'Voir les 10 offres',
                customAction: () => setIsFiltersDropdownOpen(false),
              }}
              isInTheForeground
              isFixed
            />
          )}
        </FiltersBottomSheet>
        <FilterTag
          isSelected={searchData.isLastMinute}
          onChange={() => setIsLastMinute(isLastMinute => !isLastMinute)}
          size="md"
          name="search-filters"
        >
          Last minute
        </FilterTag>
      </div>
    </form>
  )
}

export default SearchHeader
