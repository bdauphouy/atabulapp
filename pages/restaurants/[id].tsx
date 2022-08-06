import DesktopLayout from '@/components/layouts/DesktopLayout'
import Role from '@/components/restaurant/Role'
import ArrowCta from '@/components/shared/ArrowCta'
import Tag from '@/components/shared/Tag'
import Toaster from '@/components/shared/Toaster'
import Image from 'next/image'
import { ReactElement } from 'react'
import toast from 'react-hot-toast'
import { RiFileCopyLine, RiNavigationLine } from 'react-icons/ri'

const Restaurant = () => {
  const handleCopyAddressClick = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      toast.success("L'adresse a bien été copiée.")
      return navigator.clipboard.writeText(
        'Le Meurice, 228 rue de Rivoli, Paris, 75001',
      )
    }
    toast.error("Votre navigateur ne peut pas copier l'adresse.")
    return Promise.reject('The Clipboard API is not available.')
  }

  const handleGetDirectionsClick = () => {}

  return (
    <main className="px-6 py-10">
      <Toaster />
      <div className="grid h-[458px] grid-cols-[5fr,2fr,2fr] gap-1 overflow-hidden rounded-2xl">
        <div className="relative col-span-1 row-span-2">
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 1`}
          />
        </div>
        <div className="relative">
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 2`}
          />
        </div>
        <div className="relative">
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 3`}
          />
        </div>
        <div className="relative">
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 4`}
          />
        </div>
        <div className="relative">
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 5`}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[3fr,2fr] gap-6">
        <div>
          <div className="flex gap-2">
            <Tag withText type="michelin" number={2} />
            <Tag withText type="etoile-verte" number={1} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-black">
            Le Meurice - Alain Ducasse
          </h2>
          <h3 className="mt-4 text-lg text-gray">Cuisine créative</h3>
          <address className="mt-2 text-base not-italic text-gray/80">
            Le Meurice, 228 rue de Rivoli,
            <br />
            Paris, 75001
          </address>
          <div className="mt-10 border-b-[1px] border-solid border-alto/60 pb-8">
            <h3 className="text-2xl font-bold text-black">Equipe</h3>
            <ul className="mt-4 grid grid-cols-2 gap-6">
              <Role title="Chef(fe) cuisinier" subtitle="Maria Brenault" />
              <Role title="Chef(fe) Patissier(ière)" subtitle="Arnaud Meriod" />
              <Role title="Somelier(ière)" subtitle="Hélène Serres" />
              <Role
                title="Directeur(rice) de salle"
                subtitle="Jean-Marie Guérin"
              />
            </ul>
          </div>
          <div className="mt-10 border-b-[1px] border-solid border-alto/60 pb-8">
            <h3 className="text-2xl font-bold text-black">Prix moyen</h3>
            <ul className="mt-4 grid grid-cols-2 gap-6">
              <Role title="Menu sans vin" subtitle="90€" />
              <Role title="Menu découverte" subtitle="120€" />
            </ul>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-black">
              Comment s'y rendre
            </h3>
            <div className="grid grid-cols-[5fr,8fr] gap-6">
              <div>
                <ul className="mt-4">
                  <Role
                    title="Adresse"
                    subtitle="Le Meurice, 228 rue de Rivoli, Paris, 75001"
                  />
                </ul>
                <div className="mt-10">
                  <ArrowCta onClick={handleCopyAddressClick} variant="md">
                    <RiFileCopyLine size={30} />
                    Copier l'adresse
                  </ArrowCta>
                  <ArrowCta
                    onClick={handleGetDirectionsClick}
                    withUnderline={false}
                    variant="md"
                  >
                    <RiNavigationLine size={30} />
                    Obtenir l'itinéraire
                  </ArrowCta>
                </div>
              </div>
              <div className="rounded-lg bg-scarlet/10"></div>
            </div>
          </div>
        </div>
        <div className="h-[660px] bg-scarlet/10"></div>
      </div>
    </main>
  )
}

export default Restaurant

Restaurant.getLayout = (page: ReactElement) => (
  <DesktopLayout>{page}</DesktopLayout>
)
