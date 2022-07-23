import ImportImageArea from '@/components/shared/ImportImageArea'
import Modal from '@/components/shared/Modal'
import { ICorporateFiveForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupCorporateFifthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { handleSubmit, control } = useForm<ICorporateFiveForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateFiveForm> = data => {
    console.log(data)

    changeModal('SignupCorporateSixthModal')
  }

  return (
    <Modal
      title="Photos"
      formId="pictures-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupCorporateFourthModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="pictures-signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <p className="text-sm text-gray">
          Les photos sont obligatoires pour inscrire votre établissement. Vous
          pourrez en ajouter plus tard sur la gestion de votre profil.
        </p>
        <div>
          <h3 className="mb-3 text-sm text-black">Photo de couverture</h3>
          <ImportImageArea
            title="Photo de couverture"
            name="coverPicture"
            control={control}
            variant="full"
          />
        </div>
        <div>
          <h3 className="text-sm text-black">Photos supplémentaires</h3>
          <p className="mt-2 mb-3 text-sm text-gray">
            Il vous faut importer au minimum 4 photos supplémentaires pour
            valider votre profil.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <ImportImageArea
              title="Photo supplémentaire 1"
              name="additionalPictures.0"
              control={control}
              variant="normal"
            />
            <ImportImageArea
              title="Photo supplémentaire 2"
              name="additionalPictures.1"
              control={control}
              variant="normal"
            />
            <ImportImageArea
              title="Photo supplémentaire 2"
              name="additionalPictures.2"
              control={control}
              variant="normal"
            />
            <ImportImageArea
              title="Photo supplémentaire 3"
              name="additionalPictures.3"
              control={control}
              variant="normal"
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default SignupCorporateFifthModal
