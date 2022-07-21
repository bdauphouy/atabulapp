import Modal from '@/components/shared/Modal'
import { ModalProps } from '@/lib/types'

const SignupPersonalFirstModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  return (
    <Modal
      title="Inscription"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupFirstModal'),
      }}
      footerRightButton={{
        text: 'Continuer et payer',
        customAction: () => changeModal('SignupPersonalSecondModal'),
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">
        <p className="text-base text-black">
          Le coût annuel de l'inscription pour profiter des offres et avantages
          d'Atabulapp est de 30€ TTC
        </p>
        <ul className="flex flex-col gap-4 text-base text-gray">
          <li className="flex justify-between">
            <span>Durée de l'inscription</span>
            <span>1 an</span>
          </li>
          <li className="flex justify-between">
            <span>Prix de l'abonnement</span>
            <span>30€</span>
          </li>
          <li className="flex justify-between">
            <span className="text-lg font-medium text-black">Total</span>
            <span className="text-lg font-medium text-scarlet">30€ TTC</span>
          </li>
        </ul>
      </div>
    </Modal>
  )
}

export default SignupPersonalFirstModal
