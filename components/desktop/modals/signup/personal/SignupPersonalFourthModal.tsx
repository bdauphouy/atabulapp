import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import SupportingDocument from '@/components/shared/SupportingDocument'
import { SignupPersonalFormContext } from '@/contexts/forms/SignupPersonalFormContext'
import api from '@/lib/api'
import { IPersonalThreeForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupPersonalFourthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { email, password, firstName, lastName, workStatus, birthDate, city } =
    useContext(SignupPersonalFormContext)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IPersonalThreeForm>()

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onSubmit: SubmitHandler<IPersonalThreeForm> = async ({
    proofOfIdentity,
    schoolCertificate,
    workCertificate,
  }) => {
    setIsLoading(true)

    const res = await api.signupUser({
      email,
      password,
      firstName,
      lastName,
      workStatus,
      birthDate,
      city,
    })

    setIsLoading(false)

    if (res.error) {
      setError('workCertificate', {
        type: 'server',
        message: res.error,
      })
    } else {
      changeModal('SignupPersonalFifthModal')
    }
  }

  return (
    <Modal
      title="Inscription"
      formId="personal-supporting-documents-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupPersonalThirdModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
        isLoading,
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">
        <p className="text-base text-black">
          Le justificatif étudiant doit être un certificat de scolarité.
        </p>
        <form
          id="personal-supporting-documents-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
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
      </div>
    </Modal>
  )
}

export default SignupPersonalFourthModal
