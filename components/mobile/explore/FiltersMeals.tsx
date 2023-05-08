import Checkbox from '@/components/shared/Checkbox'
import { Control } from 'react-hook-form'

type FiltersMealsProps = {
  control: Control
}

const FiltersMeals = ({ control }: FiltersMealsProps) => {
  return (
    <div className="mt-6 w-full">
      <div className="flex flex-col">
        <ul className="flex flex-col">
          <li className="border-b-[1px] border-solid border-alto/30 py-4">
            <Checkbox
              value="Déjeuner"
              label="Déjeuner"
              control={control}
              name="meals.1"
              isChecked={control._formValues.meals?.includes('lunch')}
            />
          </li>
          <li className="border-b-[1px] border-solid border-alto/30 py-4">
            <Checkbox
              value="Dîner"
              label="Dîner"
              control={control}
              name="meals.2"
              isChecked={control._formValues.meals?.includes('dinner')}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FiltersMeals
