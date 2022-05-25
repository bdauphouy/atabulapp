import Button from '@/components/shared/Button'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import LoginSignupLayout from '@/components/layouts/LoginSignupLayout'
import { ReactElement } from 'react'
import { useRef } from 'react'
import { useDidUpdate, useWillUnmount } from 'rooks'

interface IPersonalThreeForm {
  file: File
}

const PersonalThree = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPersonalThreeForm>()

  const inputRef = useRef<HTMLInputElement>()

  useDidUpdate(() => {
    inputRef.current.addEventListener('input', handleInput)
  }, [inputRef])

  useWillUnmount(() => {
    inputRef.current.removeEventListener('input', handleInput)
  })

  const onSubmit: SubmitHandler<IPersonalThreeForm> = data => {
    console.log(data)
  }

  const handleClick = () => {
    inputRef.current.click()
  }

  const handleInput = () => {
    console.log('file uploaded !')
    setValue('file', inputRef.current.files[0])
  }

  return (
    <form
      id="personal-supporting-documents-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <h2 className="mb-2 text-2xl font-extrabold text-black">Justificatifs</h2>

      <ul>
        <li>
          <div>
            <h3>Certificat de scolarité</h3>
            <p>Importer un fichier .pdf ou .jpg</p>
          </div>
          <Button variant="tertiary" onClick={handleClick}>
            Importer
          </Button>
          <input
            accept="image/jpg,application/pdf"
            name="file"
            type="file"
            className="hidden"
            ref={inputRef}
          />
        </li>
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
