import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import SupportingDocument from '@/components/shared/SupportingDocument'
import { SignupPersonalFormContext } from '@/contexts/forms/SignupPersonalFormContext'
import api from '@/lib/api'
import toInternationalFormat from '@/lib/functions/toInternationalFormat'
import { IPersonalThreeForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupPersonalFourthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(SignupPersonalFormContext)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IPersonalThreeForm>({
    defaultValues: {
      schoolCertificate: previousData.schoolCertificate,
      workCertificate: previousData.workCertificate,
      proofOfIdentity: previousData.proofOfIdentity,
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<IPersonalThreeForm> = async data => {
    setIsLoading(true)

    setData({ ...previousData, ...data })

    const response = await api.signupUser({
      email: previousData.email,
      password: previousData.password,
      firstName: previousData.firstName,
      lastName: previousData.lastName,
      workStatus: previousData.workStatus,
      phone: toInternationalFormat(previousData.phoneNumber),
      birthDate: previousData.birthDate,
      city: previousData.city,
    })

    setIsLoading(false)

    if (response.error) {
      setError('workCertificate', {
        type: 'server',
        message: response.error,
      })
    } else {
      setData(null)
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
            {previousData.workStatus === 'student' ? (
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
