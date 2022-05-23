import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'
import Radio from '@/components/shared/Radio'
import Message from '@/components/shared/Message'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

interface ISignupForm {
  person: 'personal' | 'corporate'
}

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
      router.push('/mobile/inscription/entreprise/1')
    }
  }

  return (
    <div>
      <header className="relative flex h-80 w-full items-start justify-end p-4">
        <Link href="/mobile">
          <Button variant="tertiary" textColor="white">
            Accéder sans connexion
          </Button>
        </Link>
        <Image
          objectFit="cover"
          src="/login-image.png"
          layout="fill"
          alt="Cuisinier en pleine action"
          className="-z-10"
        />
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="-mt-4 flex flex-col gap-8 rounded-t-xl bg-white p-5 pb-32"
      >
        <h2 className="text-2xl font-extrabold text-black">Inscription</h2>
        <Controller
          control={control}
          rules={{ required: 'Veuillez cocher une des cases.' }}
          name="person"
          render={({ field: { onChange, name, value } }) => (
            <div className="flex flex-col gap-8">
              <Radio
                value="personal"
                name={name}
                checked={value === 'personal'}
                onChange={onChange}
                label="S'inscrire à titre personnel pour profiter des offres et des avantages"
              />
              <Radio
                value="corporate"
                name={name}
                checked={value === 'corporate'}
                onChange={onChange}
                label="Inscrire son établissement de restauration pour proposer des offres sur Atabulapp"
              />
            </div>
          )}
        />
        {errors.person && (
          <Message type="error">{errors.person.message}</Message>
        )}
        <footer className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t-[1px] border-solid border-alto bg-white p-6">
          <Link href="/mobile/connexion">
            <Button variant="tertiary">Se connecter</Button>
          </Link>
          <Button submit variant="secondary">
            Continuer
          </Button>
        </footer>
      </form>
    </div>
  )
}

export default Signup
