import Checkbox from '@/components/shared/Checkbox'
import BottomSheet from '@/components/shared/BottomSheet'
import { Control } from 'react-hook-form'
import { SetStateAction, useContext, useState } from 'react'

import { TypesOfCuisineContext } from '@/contexts/TypesOfCuisineContext'

type TypeOfCuisineBottomPopupProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: SetStateAction<any>
  isDisabled: boolean
}

const TypeOfCuisineBottomSheet = ({
  control,
  isOpen,
  setIsOpen,
  isDisabled,
}: TypeOfCuisineBottomPopupProps) => {
  const typesOfCuisine = useContext(TypesOfCuisineContext)

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setIsOpen={setIsOpen}
      snapPoints={[600, 200, 0]}
      initialSnap={0}
    >
      <header className="flex flex-col items-center gap-1 bg-white text-center">
        <h3 className="text-xl font-bold text-black">Test</h3>
        <h4 className="text-sm text-gray">Maximum 3</h4>
      </header>
      <div className="mt-6 w-full">
        <ul className="flex flex-col">
          {typesOfCuisine.map((typeOfCuisine, i) => (
            <li
              key={i}
              className="border-b-[1px] border-solid border-alto/30 py-4"
            >
              <Checkbox
                value={typeOfCuisine}
                label={typeOfCuisine}
                control={control}
                name={`typesOfCuisine.${i}`}
                isDisabled={
                  isDisabled && !control._formValues.typesOfCuisine[i]
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  )
}

export default TypeOfCuisineBottomSheet
