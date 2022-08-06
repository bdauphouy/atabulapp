import Checkbox from '@/components/shared/Checkbox'
import Tag from '@/components/shared/Tag'
import { HonorsContext } from '@/contexts/HonorsContext'
import { Honor } from '@/lib/types'
import { useContext } from 'react'
import { Control } from 'react-hook-form'

type FiltersMenuProps = {
  control: Control
}

const FiltersHonors = ({ control }: FiltersMenuProps) => {
  const honors = useContext(HonorsContext)

  return (
    <div className="mt-6 w-full">
      <div className="flex flex-col">
        <ul className="flex flex-col">
          {honors.map((honor: Honor, i) => (
            <li
              key={i}
              className="border-b-[1px] border-solid border-alto/30 py-4"
            >
              <Checkbox
                value={honor.title}
                label={
                  <div className="flex gap-2">
                    {honor.title}
                    <Tag type={honor.tag.type} number={honor.tag.number} />
                  </div>
                }
                control={control}
                name={`honors.${i}`}
                checked={control._formValues.honors?.includes(honor.title)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersHonors
