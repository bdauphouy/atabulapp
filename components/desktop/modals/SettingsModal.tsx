import Modal from '@/components/shared/Modal'
import Switch from '@/components/shared/Switch'
import { ISettingsForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SettingsModal = ({ isOpen, onClose }: ModalProps) => {
  const { control, setValue, handleSubmit, watch } = useForm<ISettingsForm>({
    defaultValues: {
      authorizeNewsletters: false,
      authorizeLocation: false,
      authorizeAll: false,
    },
  })

  const router = useRouter()

  const watchAuthorizeAll = watch('authorizeAll')

  useEffect(() => {
    setValue('authorizeNewsletters', watchAuthorizeAll)
    setValue('authorizeLocation', watchAuthorizeAll)
  }, [setValue, watchAuthorizeAll])

  const onSubmit: SubmitHandler<ISettingsForm> = data => {
    console.log(data)
  }

  return (
    <Modal
      title="Activer les paramètres"
      formId="settings-form"
      footerLeftButton={{
        text: 'Passer',
        customAction: () => onClose(),
      }}
      footerRightButton={{ text: 'Autoriser' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <div>
          <h3 className="text-lg font-bold text-black">
            Activer les newletters
          </h3>
          <p className="mt-2 mb-6 text-base text-black">
            Ne rater aucun message important tel que les rappels et détails de
            vos réservations.
          </p>
          <Switch
            control={control}
            name="authorizeNewsletters"
            label="Obtenir des actualités d'Atabulapp par mail."
          />
        </div>
        <div className="mt-6 border-b-2 border-solid border-alto/30 pb-6">
          <h3 className="text-lg font-bold text-black">
            Activer la localisation
          </h3>
          <p className="mt-2 mb-6 text-base text-black">
            Pour vous proposer une expérience plus personnelle, activez la
            localisation.
          </p>
          <Switch
            control={control}
            name="authorizeLocation"
            label="Autoriser la localisation."
          />
        </div>
        <Switch
          control={control}
          name="authorizeAll"
          label="Tout autoriser"
          className="pt-6 font-bold"
        />
      </form>
    </Modal>
  )
}

export default SettingsModal
