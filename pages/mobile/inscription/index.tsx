import LaunchLayout from '@/components/layouts/mobile/LaunchLayout'
import Message from '@/components/shared/Message'
import Radio from '@/components/shared/Radio'
import { ISignupForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ISignupForm> = ({ person }) => {
    if (person === 'personal') {
      router.push('/mobile/inscription/personnelle/1')
    } else {
      router.push('/mobile/inscription/restaurant/1')
    }
  }

  return (
    <form
      id="signup-type-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <h2 className="text-2xl font-extrabold text-black">Inscription</h2>
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
  )
}

Signup.getLayout = (page: ReactElement) => (
  <LaunchLayout
    formId="signup-type-form"
    footerLeftButton={{
      text: 'Se connecter',
      action: 'go-to-[/mobile/connexion]',
    }}
    footerRightButton={{
      text: 'Continuer',
    }}
  >
    {page}
  </LaunchLayout>
)

export default Signup
