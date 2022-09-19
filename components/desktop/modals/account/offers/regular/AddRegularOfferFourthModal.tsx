import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import { IAddRegularOfferFirstForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const AddRegularOfferFourthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddRegularOfferFirstForm>()

  const onSubmit: SubmitHandler<IAddRegularOfferFirstForm> = data => {
    // changeModal('AddRegularOfferSecondModal')
    console.log(data)
    onClose()
    toast.success('Offre régulière ajoutée avec succès !')
  }

  return (
    <Modal
      title="Offres régulières"
      formId="add-offer-fourth-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('AddRegularOfferThirdModal'),
      }}
      footerRightButton={{ text: 'Valider' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h3 className="mb-4 text-lg font-bold">Confirmation de l'offre</h3>
      <form
        id="add-offer-fourth-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <ul className="flex flex-col gap-4">
          <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
            <span>Lundi, jeudi</span>
            <Button
              variant="tertiary"
              onClick={() => changeModal('AddRegularOfferFirstModal')}
            >
              Modifier
            </Button>
          </li>
          <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
            <span>Déjeuner</span>
            <Button variant="tertiary">Modifier</Button>
          </li>
          <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
            <span>Réduction sur l'addition avec boissons</span>
            <Button variant="tertiary">Modifier</Button>
          </li>
          <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
            <span>34%</span>
            <Button variant="tertiary">Modifier</Button>
          </li>
          <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
            <span>1 ou 2 personnes</span>
            <Button variant="tertiary">Modifier</Button>
          </li>
        </ul>
      </form>
    </Modal>
  )
}

export default AddRegularOfferFourthModal
