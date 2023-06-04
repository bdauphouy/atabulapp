import DesktopLayout from '@/components/layouts/desktop/DesktopLayout'
import Booking from '@/components/restaurant/Booking'
import Role from '@/components/restaurant/Role'
import ArrowCta from '@/components/shared/ArrowCta'
import Tag from '@/components/shared/Tag'
import Toaster from '@/components/shared/Toaster'
import api from '@/lib/api'
import { Offer } from '@/lib/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { RiFileCopyLine, RiNavigationLine } from 'react-icons/ri'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css/navigation'
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
  console.log(
    restaurant.coordinates.split(',').map((c: string) => parseFloat(c)),
  )

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

  const [offers, setOffers] = useState<Offer[]>(restaurant.discounts || [])
  const [images, setImages] = useState([
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
    '/images/restaurant-card-thumbnail.png',
  ])
  const [image, setImage] = useState(0)

  const router = useRouter()

  const handleGetDirectionsClick = () => {
    router.push(
      `https://maps.${
        navigator.userAgent.includes('AppleWebKit') ? 'apple' : 'google'
      }.com/?daddr=${fullAddress}`,
    )
  }

  console.log(restaurant.distinctions)

  return (
    <main className="px-5 py-10 lg:px-32">
      <Toaster />
      {image > 0 && (
        <div
          className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[#33333380] p-5 py-32 xl:px-64"
          onClick={e =>
            (e.target as HTMLDivElement).tagName === 'DIV' &&
            !(e.target as HTMLDivElement).className.includes('swiper-button') &&
            setImage(0)
          }
        >
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            initialSlide={image - 1}
            navigation
            pagination={{ clickable: true }}
            className="h-full w-full rounded-2xl"
          >
            {images.map((image, i) => (
              <SwiperSlide
                key={i}
                className="cursor-grab active:cursor-grabbing"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={image}
                  alt={`Image du restaurant ${i}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="relative grid h-[458px] grid-cols-[5fr,2fr,2fr] gap-1 overflow-hidden rounded-2xl">
        {images.slice(0, 5).map((image, i) => (
          <div
            key={i}
            className={`${
              i === 0 ? 'row-span-4' : 'row-span-2'
            } relative col-span-1 cursor-pointer`}
            onClick={() => setImage(i + 1)}
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={image}
              alt={`Image du restaurant ${i + 1}`}
            />
          </div>
        ))}
        <div
          onClick={() => setImage(1)}
          className="absolute bottom-0 right-0 m-2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-black/30 font-bold text-white transition-colors duration-300 hover:bg-black/40"
        >
          + {images.length - 5}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[3fr,2fr]">
        <div>
          <div className="flex gap-2">
            {restaurant.distinctions.map((distinction: any) => (
              <Tag
                withText
                key={distinction.id}
                type={distinction.slug.split('_')[0]}
                number={
                  distinction.slug.includes('_')
                    ? parseInt(distinction.slug.split('_')[1])
                    : 1
                }
              />
            ))}
          </div>
          <h2 className="mt-4 text-3xl font-bold text-black">
            {restaurant.name}
          </h2>
          <h3 className="mt-4 text-lg text-gray">
            {restaurant.types
              .map((type: { name: string }) => type.name)
              .join(', ')}
          </h3>
          <address className="mt-2 text-base not-italic text-gray/80">
            {fullAddress}
          </address>
          <div className="mt-10 border-b-[1px] border-solid border-alto/60 pb-8">
            <h3 className="text-2xl font-bold text-black">Equipe</h3>
            <ul className="mt-4 grid grid-cols-2 gap-6">
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
                  <Role title="Adresse" subtitle={fullAddress} />
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
              <div className="overflow-hidden rounded-lg">
                <RouteMap
                  position={restaurant.coordinates
                    .split(',')
                    .map((c: string) => parseFloat(c))}
                />
              </div>
            </div>
          </div>
        </div>
        <Booking offers={offers} />
      </div>
    </main>
  )
}

export default Restaurant

Restaurant.getLayout = (page: ReactElement) => (
  <DesktopLayout>{page}</DesktopLayout>
)
