import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import LaunchLayout from '@/components/layouts/LaunchLayout'

const PersonalOne = () => {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 border-b-[1px] border-solid border-alto pb-6">
        <h2 className="text-2xl font-extrabold text-black">Inscription</h2>
        <p className="text-base text-black">
          Le coût annuel de l'inscription pour profiter des offres et avantages
          d'Atabulapp est de 30€ TTC
        </p>
      </header>
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
      <p className="text-base text-gray">
        Le règlement se fera une fois l'inscription validée par l'équipe
        Atabulapp.
      </p>
    </div>
  )
}

PersonalOne.getLayout = (page: ReactElement) => (
  <LaunchLayout
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Continuer',
      action: 'go-to-[/mobile/inscription/personnelle/2]',
    }}
  >
    {page}
  </LaunchLayout>
)

export default PersonalOne
