import Image from 'next/image'
import { ChangeEvent, useId, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

type ImportImageAreaProps = {
  variant: 'normal' | 'full'
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

  const [file, setFile] = useState<File>()

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
      }}
      render={({ field: { name, onChange } }) => (
        <div>
          <label
            htmlFor={uuid}
            className={`${
              variant === 'full' ? 'h-40' : 'h-32'
            } relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md bg-alto/50`}
          >
            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                layout="fill"
                alt={title}
                objectFit="cover"
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
            onInput={handleInput}
            onChange={onChange}
            id={uuid}
            name={name}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </div>
      )}
    />
  )
}

export default ImportImageArea
