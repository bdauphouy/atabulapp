import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import { ModalProps } from '@/lib/types'
import Image from 'next/image'

const SignupCorporateSixthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const handleClick = () => {
    onClose()
    changeModal('LoginModal')
  }

  return (
    <Modal
      title=""
      hasHeader={false}
      hasFooter={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="relative mt-4 flex flex-col items-center p-6">
        <h2 className="relative mb-2 text-center text-2xl font-extrabold text-black">
          <div className="absolute inline -translate-y-3 -translate-x-5">
            <Image
              src="/images/success-icon.svg"
              width={25}
              height={25}
              alt="Icône de succès"
              className="inline-block"
            />
          </div>
          Inscription en cours de validation
        </h2>

        <p className="mt-1 text-center text-base text-black">
          Votre restaurant a été correctement enregistré. L'équipe d'Atabulapp
          va étudier votre demande et vous recevrez une réponse dans les
          meilleures délais.
        </p>
        <Button variant="primary" className="mt-20" onClick={handleClick}>
          Accéder au site
        </Button>
      </div>
    </Modal>
  )
}

export default SignupCorporateSixthModal
