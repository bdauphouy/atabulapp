import Button from '@/components/shared/Button'
import { useEffect, useRef, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

type SupportingDocumentProps = {
  title: string
  name: 'schoolCertificate' | 'proofOfIdentity' | 'workCertificate'
  control: Control<any>
}

const SupportingDocument = ({
  title,
  name,
  control,
}: SupportingDocumentProps) => {
  const [file, setFile] = useState<File>()

  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    inputRef.current.addEventListener('input', handleInput)
  }, [inputRef])

  const handleClick = () => {
    inputRef.current.click()
  }

  const handleInput = () => {
    setFile(inputRef.current.files[0])
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
      }}
      render={({ field: { name, onChange } }) => (
        <li className="flex items-end justify-between border-b-[1px] border-solid border-alto/60 pb-3">
          <div>
            <h3 className="text-lg font-bold text-black">{title}</h3>
            {file && <h4 className="mt-1 text-base text-black">{file.name}</h4>}
            <p className="mt-1 text-base text-gray">
              Importer un fichier .pdf ou .jpg
            </p>
          </div>
          <Button variant="tertiary" onClick={handleClick}>
            Importer
          </Button>
          <input
            accept="image/jpg,application/pdf"
            name={name}
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={onChange}
          />
        </li>
      )}
    />
  )
}

export default SupportingDocument
