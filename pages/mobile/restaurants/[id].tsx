import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import Role from '@/components/restaurant/Role'
import ArrowCta from '@/components/shared/ArrowCta'
import Tag from '@/components/shared/Tag'
import api from '@/lib/api'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { RiFileCopyLine, RiNavigationLine } from 'react-icons/ri'
import { Pagination } from 'swiper'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

const RouteMap = dynamic(import('@/components/restaurant/RouteMap'), {
  ssr: false,
})

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  if (!typeof parseInt(id)) {
    return {
      notFound: true,
    }
  }

  const { restaurant, error } = await api.getRestaurantById(parseInt(id))

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      restaurant,
    },
  }
}

const Restaurant = ({ restaurant }) => {
  const handleCopyAddressClick = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      toast.success("L'adresse a bien été copiée.")
      return navigator.clipboard.writeText(fullAddress)
    }
    toast.error("Votre navigateur ne peut pas copier l'adresse.")
    return Promise.reject('The Clipboard API is not available.')
  }

  const fullAddress = useMemo(
    () => `${restaurant.address}, ${restaurant.zipCode} ${restaurant.city}`,
    [restaurant],
  )

  const [image, setImage] = useState('')

  const router = useRouter()

  const handleGetDirectionsClick = () => {
    router.push(
      `https://maps.${
        navigator.userAgent.includes('AppleWebKit') ? 'apple' : 'google'
      }.com/?daddr=${fullAddress}`,
    )
  }

  return (
    <>
      {image && (
        <div
          className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#33333380] p-5 xl:p-64"
          onClick={e =>
            (e.target as HTMLDivElement).tagName === 'DIV' && setImage('')
          }
        >
          <div className="relative aspect-video w-full">
            <Image
              layout="fill"
              objectFit="contain"
              src="/images/restaurant-card-thumbnail.png"
              alt={`Image du restaurant 1`}
            />
          </div>
        </div>
      )}
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        <SwiperSlide
          style={{ height: 318 }}
          className="cursor-pointer"
          onClick={() => setImage('/images/restaurant-card-thumbnail.png')}
        >
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 1`}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{ height: 318 }}
          className="cursor-pointer"
          onClick={() => setImage('/images/restaurant-card-thumbnail.png')}
        >
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 2`}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{ height: 318 }}
          className="cursor-pointer"
          onClick={() => setImage('/images/restaurant-card-thumbnail.png')}
        >
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 3`}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{ height: 318 }}
          className="cursor-pointer"
          onClick={() => setImage('/images/restaurant-card-thumbnail.png')}
        >
          <Image
            layout="fill"
            objectFit="cover"
            src="/images/restaurant-card-thumbnail.png"
            alt={`Image du restaurant 4`}
          />
        </SwiperSlide>
      </Swiper>
      <main className="mt-6 gap-6 px-5 pb-10">
        <div>
          <div className="flex gap-2">
            {restaurant.distinctions.map((distinction: any) => (
              <Tag
                withText
                key={distinction.id}
                type={distinction.slug.split('_')[0]}
                number={parseInt(distinction.slug.split('_')[1])}
              />
            ))}
          </div>
          <h2 className="mt-2 text-2xl text-black">{restaurant.name}</h2>
          <h3 className="text-lg text-gray">
            {restaurant.types
              .map((type: { name: string }) => type.name)
              .join(', ')}
          </h3>
          <address className="mt-2 text-base not-italic text-gray/80">
            {fullAddress}
          </address>
          <div className="mt-8">
            <h3 className="text-lg font-bold text-black">Réservation</h3>
            <div className="mt-4 h-96 bg-scarlet/10"></div>
          </div>
          <div className="mt-10 border-b-[1px] border-solid border-alto/60 pb-5">
            <h3 className="text-lg font-bold text-black">Equipe</h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-6 gap-x-2">
              {restaurant.headChefFullName && (
                <Role
                  title="Chef(fe) cuisinier"
                  subtitle={restaurant.headChefFullName}
                />
              )}
              {restaurant.pastryChefFullName && (
                <Role
                  title="Chef(fe) Patissier(ière)"
                  subtitle={restaurant.pastryChefFullName}
                />
              )}
              {restaurant.sommelierFullName && (
                <Role
                  title="Somelier(ière)"
                  subtitle={restaurant.sommelierFullName}
                />
              )}
              {restaurant.restaurantManagerFullName && (
                <Role
                  title="Directeur(rice) de salle"
                  subtitle={restaurant.restaurantManagerFullName}
                />
              )}
            </ul>
          </div>
          <div className="mt-6 border-b-[1px] border-solid border-alto/60 pb-5">
            <h3 className="text-lg font-bold text-black">Prix moyen</h3>
            <ul className="mt-4 grid grid-cols-2 gap-6">
              <Role title="Menu sans vin" subtitle="90€" />
              <Role title="Menu découverte" subtitle="120€" />
            </ul>
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-bold text-black">
              Comment s'y rendre ?
            </h3>
            <div className="mt-4">
              <div className="h-44 overflow-hidden rounded-lg">
                <RouteMap
                  position={restaurant.coordinates
                    .split(',')
                    .map((c: string) => parseFloat(c))}
                />
              </div>
              <div className="mt-4">
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
          </div>
        </div>
      </main>
    </>
  )
}

export default Restaurant

Restaurant.getLayout = (page: ReactElement) => (
  <MobileLayout withArrowBack>{page}</MobileLayout>
)
