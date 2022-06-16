// import Switch from '@/components/shared/Switch'
// import { useForm, SubmitHandler } from 'react-hook-form'

// const Home = () => {

//   return (
//     <div className="flex h-screen flex-col items-center justify-center gap-4">
//       <h1 className="text-2xl font-medium">Atabulapp</h1>
//       <h2 className="text-gray">En cours de développement...</h2>
//     </div>
//   )
// }

// export default Home

import Image from 'next/image'
import RestaurantCard from '@/components/shared/RestaurantCard'
import Section from '@/components/homepage/Section'
import { ReactElement } from 'react'
import DesktopLayout from '@/components/layouts/DesktopLayout'

const Homepage = () => {
  return (
    <div>
      <header className="flex h-28 lg:h-[450px]">
        <div className="flex flex-[2] items-center justify-center bg-white-rock px-16 py-8 lg:py-40">
          <div className="relative h-full w-full">
            <Image
              src="/images/full-logo.svg"
              alt="Logo d'Atabulapp"
              layout="fill"
            />
          </div>
        </div>
        <div className="relative hidden flex-[5] lg:block">
          <Image
            layout="fill"
            src="/images/homepage-header.png"
            alt="Assiette gastronomique"
            objectFit="cover"
          />
        </div>
      </header>
      <main className="flex flex-col gap-11 py-10">
        <Section title="A proximité">
          {[...Array(5)].map((_, i) => {
            return (
              <RestaurantCard
                key={i}
                thumbnail="/images/restaurant-card-thumbnail.png"
                name="La Meurice Alain Ducasse"
                typesOfCooking={['Cuisine créative']}
                location="PARIS (75001)"
                tags={[
                  { name: 'michelin', level: 2 },
                  { name: 'etoile-verte', level: 1 },
                ]}
                certified
                promotion={30}
              />
            )
          })}
        </Section>
        <Section title="Last minute">
          {[...Array(5)].map((_, i) => {
            return (
              <RestaurantCard
                key={i}
                thumbnail="/images/restaurant-card-thumbnail.png"
                name="La Meurice Alain Ducasse"
                typesOfCooking={['Cuisine créative']}
                location="PARIS (75001)"
                tags={[
                  { name: 'michelin', level: 2 },
                  { name: 'etoile-verte', level: 1 },
                ]}
                certified
                promotion={50}
              />
            )
          })}
        </Section>
        <div className="px-6 lg:px-32">
          <div className="flex h-48 w-full items-center justify-center rounded-lg bg-alto text-lg font-bold text-white">
            PUB
          </div>
        </div>
        <Section title="Sélection Atabulapp">
          {[...Array(5)].map((_, i) => {
            return (
              <RestaurantCard
                key={i}
                thumbnail="/images/restaurant-card-thumbnail.png"
                name="La Meurice Alain Ducasse"
                typesOfCooking={['Cuisine créative']}
                location="PARIS (75001)"
                tags={[
                  { name: 'michelin', level: 2 },
                  { name: 'etoile-verte', level: 1 },
                ]}
                certified
                promotion={60}
              />
            )
          })}
        </Section>
        <Section title="Offres disponibles" isGrid>
          {[...Array(4)].map((_, i) => {
            return (
              <RestaurantCard
                key={i}
                thumbnail="/images/restaurant-card-thumbnail.png"
                name="La Meurice Alain Ducasse"
                typesOfCooking={['Cuisine créative']}
                location="PARIS (75001)"
                tags={[
                  { name: 'michelin', level: 2 },
                  { name: 'etoile-verte', level: 1 },
                ]}
                certified
                promotion={10}
                size="large"
              />
            )
          })}
        </Section>
      </main>
    </div>
  )
}

export default Homepage

Homepage.getLayout = (page: ReactElement) => (
  <DesktopLayout>{page}</DesktopLayout>
)
