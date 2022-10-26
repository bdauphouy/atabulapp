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
      hasFooter={false}
      isOpen={isOpen}
      onClose={onClose}
      hasGoBackArrow
      onGoBack={() => changeModal('SignupPersonalFirstModal')}
    >
      payment
    </Modal>
  )
}

export default SignupPersonalSecondModal
