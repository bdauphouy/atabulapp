import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import SupportingDocument from '@/components/shared/SupportingDocument'
import { IPersonalThreeForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupPersonalFourthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPersonalThreeForm>()

  const router = useRouter()

  const [workStatus, setWorkStatus] = useState<'student' | 'employee'>()

  useEffect(() => {
    const { workStatus } = router.query

    if (workStatus === 'employee') {
      setWorkStatus('employee')
    } else {
      setWorkStatus('student')
    }
  }, [router])

  const onSubmit: SubmitHandler<IPersonalThreeForm> = data => {
    console.log(data)
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
        customAction: () => changeModal('SignupPersonalFifthModal'),
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
              Veuillez importer tous les documents.
            </Message>
          )}
        </form>
      </div>
    </Modal>
  )
}

export default SignupPersonalFourthModal
