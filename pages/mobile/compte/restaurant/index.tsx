import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import ArrowCta from '@/components/shared/ArrowCta'
import Button from '@/components/shared/Button'
import api from '@/lib/api'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

export const getServerSideProps = requireAuth(async ({ req }) => {
  const { token } = req.cookies
  const restaurantId = api.getRestaurantId(token)

  const { error, restaurant } = await api.getRestaurantById(restaurantId)

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
})

const AccountIndex = ({ restaurant }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await api.logout()
    router.push('/mobile/connexion')
  }

  const [regularOffersNumber, setRegularOffersNumber] = useState(0)
  const [lastMinuteOffersNumber, setLastMinuteOffersNumber] = useState(0)

  useEffect(() => {
    const getOffers = async () => {
      const { restaurant } = await api.getRestaurantById(
        api.getRestaurantId(Cookies.get('token')),
      )

      if (restaurant.discounts) {
        setRegularOffersNumber(
          restaurant.discounts.filter(
            (discount: { type: 'lastMinute' | 'regular' }) =>
              discount.type === 'regular',
          ).length,
        )
        setLastMinuteOffersNumber(
          restaurant.discounts.filter(
            (discount: { type: 'lastMinute' | 'regular' }) =>
              discount.type === 'lastMinute',
          ).length,
        )
      }
      console.log(restaurant)
    }
    getOffers()
  }, [])

  return (
    <div className="">
      <header className="mb-10">
        <div className="relative h-36">
          <Image
            layout="fill"
            src="/images/restaurant-card-thumbnail.png"
            alt="Bannière du restaurant"
            objectFit="cover"
          />
        </div>
        <div className="px-5 pt-6">
          <h2 className="text-2xl text-black">{restaurant.name}</h2>
          {restaurant.isEmailConfirmed && (
            <p className="mt-2 text-base text-black">
              Restaurant certifié Atabulapp
            </p>
          )}
        </div>
      </header>
      <div className="px-5">
        <h3 className="text-lg font-bold text-black">Profil</h3>
        <div className="mt-2">
          <ArrowCta
            variant="md"
            onClick={() =>
              router.push('/mobile/compte/restaurant/informations-restaurant')
            }
          >
            Informations restaurant
          </ArrowCta>
          <ArrowCta
            withUnderline={false}
            variant="md"
            onClick={() => {
              router.push('/mobile/compte/restaurant/photos')
            }}
          >
            Photos
          </ArrowCta>
        </div>
        <h3 className="mt-6 text-lg font-bold text-black">Les offres</h3>
        <div className="mt-2">
          <ArrowCta
            variant="md"
            onClick={() =>
              router.push('/mobile/compte/restaurant/offres-regulieres')
            }
          >
            Offres régulières
            <div className="flex h-7 items-center justify-center rounded-full bg-scarlet px-3 text-white">
              {regularOffersNumber}
            </div>
          </ArrowCta>
          <ArrowCta
            variant="md"
            onClick={() => {
              router.push('/mobile/compte/restaurant/offres-last-minute')
            }}
          >
            Offres last minute
            <div className="flex h-7 items-center justify-center rounded-full bg-scarlet px-3 text-white">
              {lastMinuteOffersNumber}
            </div>
          </ArrowCta>
          <ArrowCta
            withUnderline={false}
            variant="md"
            onClick={() => {
              router.push('/mobile/compte/restaurant/scanner-un-qrcode')
            }}
          >
            Scanner un QR Code
          </ArrowCta>
        </div>
        <Button variant="tertiary" className="mt-6" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
    </div>
  )
}

export default AccountIndex

AccountIndex.getLayout = (page: ReactElement) => (
  <MobileLayout>{page}</MobileLayout>
)
