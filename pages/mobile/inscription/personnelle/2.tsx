import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'
import Radio from '@/components/shared/Radio'
import Message from '@/components/shared/Message'
import Input from '@/components/shared/Input'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import LoginSignupLayout from '@/components/layouts/LoginSignupLayout'
import { ReactElement } from 'react'
import get from '@/lib/get'
import { useDidUpdate } from 'rooks'

interface ISignupForm {
  email: string
  lastName: string
  firstName: string
  birthDate: string
  city: string
  password: string
  workStatus: 'student' | 'employee'
}

const PersonalTwo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ISignupForm> = data => {
    console.log(data)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="-mt-4 flex w-full flex-col gap-6 rounded-t-xl bg-white p-5 pb-32"
      >
        <h2 className="mb-2 text-2xl font-extrabold text-black">Inscription</h2>
        <Controller
          control={control}
          rules={{
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: 'Veuillez renseigner une adresse email valide.',
            },
          }}
          name="email"
          render={({ field: { onChange, name, value } }) => (
            <Input
              placeholder="Email"
              onChange={onChange}
              name={name}
              defaultValue={value}
            />
          )}
        />
        <Controller
          control={control}
          rules={{ required: 'Veuillez renseigner votre nom.' }}
          name="lastName"
          render={({ field: { onChange, name, value } }) => (
            <Input
              placeholder="Nom"
              onChange={onChange}
              name={name}
              defaultValue={value}
            />
          )}
        />
        <Controller
          control={control}
          rules={{ required: 'Veuillez renseigner votre prénom.' }}
          name="firstName"
          render={({ field: { onChange, name, value } }) => (
            <Input
              placeholder="Prénom"
              onChange={onChange}
              name={name}
              defaultValue={value}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            pattern: {
              value:
                /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
              message: 'Veuillez renseigner une date de naissance valide.',
            },
          }}
          name="birthDate"
          render={({ field: { onChange, name, value } }) => (
            <Input
              placeholder="Date de naissance (jj/mm/aaaa)"
              onChange={onChange}
              name={name}
              defaultValue={value}
              isDateInput
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: 'Veuillez renseigner votre commune de résidence.',
          }}
          name="city"
          render={({ field: { onChange, name, value } }) => (
            <Input
              placeholder="Commune de résidence"
              onChange={onChange}
              name={name}
              defaultValue={value}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            minLength: {
              value: 6,
              message:
                'Votre mot de passe doit contenir au moins 6 caractères.',
            },
          }}
          name="password"
          render={({ field: { onChange, name, value } }) => (
            <Input
              placeholder="Mot de passe"
              onChange={onChange}
              name={name}
              defaultValue={value}
              isPasswordInput
            />
          )}
        />
        <h3 className="-mb-2 text-lg font-bold text-black">
          Situation professionnelle
        </h3>
        <Controller
          control={control}
          rules={{
            required: 'Veuillez renseigner une sitation professionnelle.',
          }}
          name="workStatus"
          render={({ field: { onChange, name, value } }) => (
            <div className="flex flex-col gap-5">
              <div className="border-b-[1px] border-solid border-alto pb-5">
                <Radio
                  value="student"
                  name={name}
                  checked={value === 'student'}
                  onChange={onChange}
                  label="Etudiant.e en restauration et hôtellerie"
                />
              </div>
              <Radio
                value="employee"
                name={name}
                checked={value === 'employee'}
                onChange={onChange}
                label="Employé.e en restauration et hôtellerie"
              />
            </div>
          )}
        />
        {Object.keys(errors).length > 0 && (
          <Message type="error">
            {errors.birthDate
              ? errors.birthDate.message
              : errors.email
              ? errors.email.message
              : errors.password
              ? errors.password.message
              : 'Veuillez remplir tous les champs.'}
          </Message>
        )}
        <p className="text-sm text-black">
          En selectionnant Accepter et continuer, j'accepte les{' '}
          <Link href="/conditions-generales" className="text-scarlet">
            Conditions générales
          </Link>{' '}
          et la{' '}
          <Link href="/politique-de-confidentialite" className="text-scarlet">
            Politique de confidentialité
          </Link>{' '}
          d'Atabul'app
        </p>
        <footer className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t-[1px] border-solid border-alto bg-white p-6">
          <Link href="/mobile/connexion">
            <Button variant="tertiary">Retour</Button>
          </Link>
          <Button submit variant="secondary">
            Accepter et continuer
          </Button>
        </footer>
      </form>
    </div>
  )
}

PersonalTwo.getLayout = (page: ReactElement) => (
  <LoginSignupLayout>{page}</LoginSignupLayout>
)

export default PersonalTwo
