import Modal from '@/components/shared/Modal'
import { IPersonalTwoForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupPersonalSecondModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPersonalTwoForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<IPersonalTwoForm> = data => {
    console.log(data)
  }

  return (
    <Modal
      title="Règlement"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupFirstModal'),
      }}
      footerRightButton={{
        text: 'Continuer et payer',
        customAction: () => changeModal('SignupPersonalThirdModal'),
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      payment
    </Modal>
  )
}

export default SignupPersonalSecondModal
