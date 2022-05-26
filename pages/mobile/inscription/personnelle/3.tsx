import Button from '@/components/shared/Button'
import { useForm, SubmitHandler, UseFormSetValue } from 'react-hook-form'
import LoginSignupLayout from '@/components/layouts/LoginSignupLayout'
import { ReactElement } from 'react'
import { useRef, useState, useEffect } from 'react'
import { useDidUpdate, useWillUnmount } from 'rooks'
import { useRouter } from 'next/router'

interface IPersonalThreeForm {
  schoolCertificate?: File
  proofOfIdentity?: File
  workCertificate?: File
}

type SupportingDocumentProps = {
  title: string
  name: 'schoolCertificate' | 'proofOfIdentity' | 'workCertificate'
  setValue: UseFormSetValue<IPersonalThreeForm>
}

const SupportingDocument = ({
  title,
  name,
  setValue,
}: SupportingDocumentProps) => {
  const inputRef = useRef<HTMLInputElement>()

  useDidUpdate(() => {
    inputRef.current.addEventListener('input', handleInput)
  }, [inputRef])

  const handleClick = () => {
    inputRef.current.click()
  }

  const handleInput = () => {
    console.log('file uploaded !')
    setValue(name, inputRef.current.files[0])
  }

  return (
    <li className="flex items-end justify-between border-b-[1px] border-solid border-alto pb-3">
      <div>
        <h3 className="text-lg font-bold text-black">{title}</h3>
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
      />
    </li>
  )
}

const PersonalThree = () => {
  const {
    handleSubmit,
    setValue,
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
    console.log(data)
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
            setValue={setValue}
          />
        ) : (
          <>
            <SupportingDocument
              title="Justificatif d'identité"
              name="proofOfIdentity"
              setValue={setValue}
            />
            <SupportingDocument
              title="Justificatif de travail"
              name="workCertificate"
              setValue={setValue}
            />
          </>
        )}
      </ul>
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
