import BottomSheet from '@/components/mobile/BottomSheet'
import { FilterCategory, SelectedFilters } from '@/lib/types'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Control } from 'react-hook-form'
import { RiArrowLeftSLine } from 'react-icons/ri'
import FiltersDate from './FiltersDate'
import FiltersHonors from './FiltersHonors'
import FiltersMeals from './FiltersMeals'
import FiltersMenu from './FiltersMenu'
import FiltersTypesOfCuisine from './FiltersTypesOfCuisine'

export type FiltersBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selectedFilters: SelectedFilters
  children: ReactNode
}

const FiltersBottomSheet = ({
  control,
  isOpen,
  setIsOpen,
  selectedFilters,
  children,
}: FiltersBottomSheetProps) => {
  const [currentCategory, setCurrentCategory] =
    useState<FilterCategory>('Filtres')

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setIsOpen={setIsOpen}
      snapPoints={[600, 200, 0]}
      initialSnap={0}
    >
      <header className="flex items-center justify-between gap-1 bg-white text-center">
        {currentCategory !== 'Filtres' ? (
          <RiArrowLeftSLine
            size={30}
            className="cursor-pointer"
            onClick={() => setCurrentCategory('Filtres')}
          />
        ) : (
          <div className="h-[30px] w-[30px]" />
        )}
        <h3 className="text-xl font-bold text-black">{currentCategory}</h3>
        <div className="w-[30px]" />
      </header>
      {currentCategory === 'Filtres' ? (
        <FiltersMenu
          selectedFilters={selectedFilters}
          setCurrentCategory={setCurrentCategory}
        />
      ) : currentCategory === 'Distinctions' ? (
        <FiltersHonors control={control} />
      ) : currentCategory === 'Repas' ? (
        <FiltersMeals control={control} />
      ) : currentCategory === 'Type de cuisine' ? (
        <FiltersTypesOfCuisine control={control} />
      ) : currentCategory === 'Date' ? (
        <FiltersDate control={control} />
      ) : null}
      {children}
    </BottomSheet>
  )
}

export default FiltersBottomSheet
