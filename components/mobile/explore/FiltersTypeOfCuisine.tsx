import Checkbox from '@/components/shared/Checkbox'
import Tag from '@/components/shared/Tag'
import { TypesOfCuisineContext } from '@/contexts/TypesOfCuisineContext'
import { Honor } from '@/lib/types'
import { useContext } from 'react'
import { Control } from 'react-hook-form'

type FiltersTypeOfCuisineProps = {
  control: Control
}

const FiltersTypeOfCuisine = ({ control }: FiltersTypeOfCuisineProps) => {
  const typesOfCuisine = useContext(TypesOfCuisineContext)

  return (
    <div className="mt-6 w-full pb-20">
      <div className="flex flex-col">
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
                isChecked={control._formValues.typeOfCuisine?.includes(
                  typeOfCuisine,
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersTypeOfCuisine
