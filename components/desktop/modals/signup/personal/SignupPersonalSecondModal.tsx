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
      hasFooter={true}
      isOpen={isOpen}
      onClose={onClose}
      hasGoBackArrow
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupPersonalFirstModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
        customAction: () => changeModal('SignupPersonalThirdModal'),
      }}
      onGoBack={() => changeModal('SignupPersonalFirstModal')}
    >
      payment
    </Modal>
  )
}

export default SignupPersonalSecondModal
