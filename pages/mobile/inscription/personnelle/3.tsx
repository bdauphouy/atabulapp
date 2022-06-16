import Button from '@/components/shared/Button'
import {
  useForm,
  SubmitHandler,
  UseFormSetValue,
  Controller,
  Control,
} from 'react-hook-form'
import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import { useRef, useState, ReactElement } from 'react'
import { useDidUpdate } from 'rooks'
import { useRouter } from 'next/router'
import Message from '@/components/shared/Message'

interface IPersonalThreeForm {
  schoolCertificate?: File
  proofOfIdentity?: File
  workCertificate?: File
}

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

  useDidUpdate(() => {
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
        <li className="flex items-end justify-between border-b-[1px] border-solid border-alto pb-3">
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

const PersonalThree = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPersonalThreeForm>()

  const router = useRouter()

  const [workStatus, setWorkStatus] = useState<'student' | 'employee'>()

  useDidUpdate(() => {
    const { workStatus } = router.query

    if (workStatus === 'employee') {
      setWorkStatus('employee')
    } else {
      setWorkStatus('student')
    }
  })

  const onSubmit: SubmitHandler<IPersonalThreeForm> = data => {
    router.push('/mobile/inscription/personnelle/4')
  }

  return (
    <form
      id="personal-supporting-documents-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <h2 className="mb-2 text-2xl font-extrabold text-black">Justificatifs</h2>

      <ul className="flex flex-col gap-10">
        {workStatus === 'student' ? (
          <SupportingDocument
            title="Certificat de scolarité"
            name="schoolCertificate"
            control={control}
          />
        ) : (
          <>
            <SupportingDocument
              title="Justificatif d'identité"
              name="proofOfIdentity"
              control={control}
            />
            <SupportingDocument
              title="Justificatif de travail"
              name="workCertificate"
              control={control}
            />
          </>
        )}
      </ul>
      {Object.keys(errors).length > 0 && (
        <Message type="error">Veuillez importer tous les documents.</Message>
      )}
    </form>
  )
}

PersonalThree.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="personal-supporting-documents-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Accepter et continuer',
    }}
  >
    {page}
  </LoginSignupLayout>
)

export default PersonalThree
