import toBase64 from '@/lib/functions/toBase64'
import Image from 'next/image'
import { useId, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'

type ImportImageAreaProps = {
  variant: 'normal' | 'full' | 'dashed' | 'dashed-full'
  control: Control<any>
  name: `additionalPictures.${number}` | 'coverPicture'
  title: string
}

const ImportImageArea = ({
  variant,
  control,
  name,
  title,
}: ImportImageAreaProps) => {
  const uuid = useId()

  const [file, setFile] = useState<string>()

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: variant !== 'dashed',
      }}
      render={({ field: { name, onChange, value } }) => {
        value && toBase64(value).then(response => setFile(response as string))
        return (
          <div className="relative">
            {value && (
              <button
                onClick={() => {
                  setFile(null)
                  onChange(null)
                }}
                className="absolute right-0 top-0 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-solid border-gray bg-white"
              >
                <RiCloseLine className="text-gray" size={20} />
              </button>
            )}
            <label
              htmlFor={uuid}
              className={`${
                variant === 'full' || variant === 'dashed-full'
                  ? 'h-40'
                  : 'h-28'
              } ${
                variant === 'dashed' || variant === 'dashed-full'
                  ? 'border-2 border-dashed border-scarlet'
                  : 'bg-alto/50'
              } relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md`}
            >
              {file ? (
                <Image src={file} layout="fill" alt={title} objectFit="cover" />
              ) : variant === 'dashed' || variant === 'dashed-full' ? (
                <RiAddLine
                  className="rounded-full border-2 border-solid border-scarlet text-scarlet"
                  size={36}
                />
              ) : (
                <div className="relative h-14 w-14">
                  <Image
                    src="/images/import-picture-icon.svg"
                    layout="fill"
                    alt="Icône importer une photo"
                  />
                </div>
              )}
              {variant === 'full' && (
                <p className="mt-2 text-base text-scarlet underline">
                  Importer une photo
                </p>
              )}
            </label>
            <input
              onChange={e => {
                onChange({
                  target: {
                    value: e.target.files[0],
                  },
                })
              }}
              id={uuid}
              name={name}
              type="file"
              className="hidden"
              accept="image/*"
            />
          </div>
        )
      }}
    />
  )
}

export default ImportImageArea
