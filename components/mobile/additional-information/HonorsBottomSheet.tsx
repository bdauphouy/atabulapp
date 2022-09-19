import BottomSheet from '@/components/mobile/BottomSheet'
import Checkbox from '@/components/shared/Checkbox'
import Tag from '@/components/shared/Tag'
import { HonorsContext } from '@/contexts/HonorsContext'
import { Honor } from '@/lib/types'
import { Dispatch, SetStateAction, useContext } from 'react'
import { Control } from 'react-hook-form'

export type HonorsBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const HonorsBottomSheet = ({
  control,
  isOpen,
  setIsOpen,
}: HonorsBottomSheetProps) => {
  const honors = useContext(HonorsContext)

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setIsOpen={setIsOpen}
      snapPoints={[600, 200, 0]}
      initialSnap={0}
    >
      <header className="flex flex-col items-center gap-1 bg-white text-center">
        <h3 className="text-xl font-bold text-black">Distinctions</h3>
      </header>
      <div className="mt-6 w-full">
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
                isChecked={control._formValues.honors?.includes(honor.title)}
              />
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  )
}

export default HonorsBottomSheet
