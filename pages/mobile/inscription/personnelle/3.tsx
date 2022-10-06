import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import Message from '@/components/shared/Message'
import SupportingDocument from '@/components/shared/SupportingDocument'
import { SignupPersonalFormContext } from '@/contexts/forms/SignupPersonalFormContext'
import signup from '@/lib/actions/signup'
import { IPersonalThreeForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const PersonalThree = () => {
  const { email, password, firstName, lastName, workStatus, birthDate, city } =
    useContext(SignupPersonalFormContext)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IPersonalThreeForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<IPersonalThreeForm> = async ({
    proofOfIdentity,
    schoolCertificate,
    workCertificate,
  }) => {
    const res = await signup(
      email,
      password,
      firstName,
      lastName,
      workStatus,
      birthDate,
      city,
    )

    if (res.error) {
      setError('workCertificate', {
        type: 'server',
        message: res.error,
      })
    } else {
      router.push('/mobile/inscription/personnelle/4')
    }
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
        <Message type="error">
          {errors.workCertificate?.type === 'server'
            ? errors.workCertificate?.message
            : 'Veuillez importer tous les documents.'}
        </Message>
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
