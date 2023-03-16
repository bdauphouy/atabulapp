import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import { ModalProps } from '@/lib/types'
import { ShowLoginModal } from '@/contexts/ShowLoginModal'
import { useContext } from 'react'

const AskToLoginModal = ({ isOpen, onClose, changeModal }: ModalProps) => {
  const { setShowLoginModal } = useContext(ShowLoginModal)

  const handleClose = () => {
    onClose()
    setShowLoginModal(false)
    changeModal('LoginModal')
  }

  return (
    <Modal
      hasFooter={false}
      title="Connexion"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <h3 className="text-base text-gray">
        Pour accéder à ces pages, vous devez être connecté à votre compte
        Atabulapp.
      </h3>
      <div className="absolute left-0 bottom-8 flex w-full flex-col items-center gap-4">
        <Button variant="primary" onClick={() => changeModal('LoginModal')}>
          Se connecter
        </Button>
        <Button
          variant="tertiary"
          onClick={() => changeModal('SignupFirstModal')}
        >
          S'inscrire
        </Button>
      </div>
      <div className="mb-10"></div>
    </Modal>
  )
}

export default AskToLoginModal
