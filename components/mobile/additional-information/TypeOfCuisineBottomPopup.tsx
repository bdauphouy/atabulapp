import BottomPopup from '@/components/mobile/BottomPopup'
import Checkbox from '@/components/shared/Checkbox'
import { Control } from 'react-hook-form'
import { useContext } from 'react'

import { TypesOfCuisineContext } from '@/contexts/TypesOfCuisineContext'

type TypeOfCuisineBottomPopupProps = {
  control: Control<any>
  isOpen?: boolean
}

const TypeOfCuisineBottomPopup = ({
  control,
  isOpen = false,
}: TypeOfCuisineBottomPopupProps) => {
  const typesOfCuisine = useContext(TypesOfCuisineContext)

  return (
    <BottomPopup isOpen={isOpen} title="Type de cuisine" subtitle="Maximum 3">
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
            />
          </li>
        ))}
      </ul>
    </BottomPopup>
  )
}

export default TypeOfCuisineBottomPopup
