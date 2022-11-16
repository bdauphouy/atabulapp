import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import Radio from '@/components/shared/Radio'
import { ISignupForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupFirstModal = ({ isOpen, onClose, changeModal }: ModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>()

  const onSubmit: SubmitHandler<ISignupForm> = ({ person }) => {
    if (person === 'personal') {
      changeModal('SignupPersonalFirstModal')
    } else {
      changeModal('SignupRestaurantFirstModal')
    }
  }
  return (
    <Modal
      title="Inscription"
      formId="signup-type-form"
      footerLeftButton={{
        text: 'Se connecter',
        customAction: () => changeModal('LoginModal'),
      }}
      footerRightButton={{ text: 'Continuer' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="signup-type-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <Radio
          control={control}
          rules={{
            required: 'Veuillez cocher une des cases.',
          }}
          value="personal"
          name="person"
          label="S'inscrire à titre personnel pour profiter des offres et des avantages"
        />
        <Radio
          control={control}
          value="restaurant"
          name="person"
          label="Inscrire son établissement de restauration pour proposer des offres sur Atabulapp"
        />
        {errors.person && (
          <Message className="-mt-2" type="error">
            {errors.person.message}
          </Message>
        )}
      </form>
    </Modal>
  )
}

export default SignupFirstModal
