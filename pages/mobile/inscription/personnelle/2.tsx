import Link from 'next/link'
import Radio from '@/components/shared/Radio'
import Message from '@/components/shared/Message'
import Input from '@/components/shared/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import { ReactElement, useId } from 'react'

interface IPersonalTwoForm {
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
    setValue,
    formState: { errors },
  } = useForm<IPersonalTwoForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<IPersonalTwoForm> = data => {
    if (data.workStatus === 'student') {
      router.push('/mobile/inscription/personnelle/3?workStatus=student')
    } else {
      router.push('/mobile/inscription/personnelle/3?workStatus=employee')
    }
  }

  return (
    <form
      id="signup-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <h2 className="mb-2 text-2xl font-extrabold text-black">Inscription</h2>
      <Input
        placeholder="Email"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
          pattern: {
            value:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: 'Veuillez renseigner une adresse email valide.',
          },
        }}
        name="email"
      />
      <Input
        placeholder="Nom"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="lastName"
      />
      <Input
        placeholder="Prénom"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="firstName"
      />
      <Input
        placeholder="Date de naissance (jj/mm/aaaa)"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
          pattern: {
            value:
              /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
            message: 'Veuillez renseigner une date de naissance valide.',
          },
        }}
        name="birthDate"
        isDateInput
      />
      <Input
        placeholder="Commune de résidence"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="city"
      />
      <Input
        placeholder="Mot de passe"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
          minLength: {
            value: 6,
            message: 'Votre mot de passe doit contenir au moins 6 caractères.',
          },
        }}
        name="password"
        isPasswordInput
      />
      <h3 className="-mb-2 text-lg font-bold text-black">
        Situation professionnelle
      </h3>
      <Radio
        control={control}
        rules={{
          required: true,
        }}
        value="student"
        name="workStatus"
        label="Etudiant.e en restauration et hôtellerie"
      />
      <Radio
        control={control}
        value="employee"
        name="workStatus"
        label="Employé.e en restauration et hôtellerie"
      />
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.birthDate?.type === 'pattern'
            ? errors.birthDate.message
            : errors.email?.type === 'pattern'
            ? errors.email.message
            : errors.password?.type === 'minLength'
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
    </form>
  )
}

PersonalTwo.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="signup-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Accepter et continuer',
    }}
  >
    {page}
  </LoginSignupLayout>
)

export default PersonalTwo
