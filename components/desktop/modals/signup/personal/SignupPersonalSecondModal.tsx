import Modal from '@/components/shared/Modal'
import { ModalProps } from '@/lib/types'

const SignupPersonalSecondModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
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
