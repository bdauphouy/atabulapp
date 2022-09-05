import BottomSheet from '@/components/mobile/BottomSheet'
import { FilterCategory, SelectedFilters } from '@/lib/types'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Control } from 'react-hook-form'
import { RiArrowLeftSLine } from 'react-icons/ri'
import FiltersHonors from './FiltersHonors'
import FiltersMenu from './FiltersMenu'

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
      ) : (
        <FiltersHonors control={control} />
      )}
      {children}
    </BottomSheet>
  )
}

export default FiltersBottomSheet
