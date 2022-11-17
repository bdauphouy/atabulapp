import ArrowCta from '@/components/shared/ArrowCta'
import Button from '@/components/shared/Button'
import Footer from '@/components/shared/Footer'
import api from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const RestaurantAccountLayout = ({ children, withSideMenu = true }) => {
  const router = useRouter()

  const handleLogout = () => {
    api.logout()
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-center border-b-[1px] border-solid border-alto/60 pt-6 pb-3">
        <div className="flex w-full max-w-5xl items-end">
          <div className="w-96">
            <Link href="/">
              <div className="bg relative h-14 w-24">
                <Image
                  src="/images/full-logo.svg"
                  alt="Logo d'Atabulapp"
                  layout="fill"
                />
              </div>
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-black">Mon compte</h2>
          </div>
        </div>
      </header>
      <div className="mx-auto mt-10 flex w-full max-w-5xl flex-1">
        {withSideMenu && (
          <aside className="border-right sticky top-0 h-full w-96 border-r-[1px] border-solid border-alto/60 py-10 pr-6">
            <div>
              <h3 className="mb-2 text-lg font-bold text-black">Profil</h3>
              <ArrowCta
                variant="lg"
                onClick={() =>
                  router.push('/compte/restaurant/informations-restaurant')
                }
              >
                Informations restaurant
              </ArrowCta>
              <ArrowCta
                variant="lg"
                onClick={() => router.push('/compte/restaurant/photos')}
              >
                Photos
              </ArrowCta>
            </div>
            <div className="mt-8">
              <h3 className="mb-2 text-lg font-bold text-black">Les offres</h3>
              <ArrowCta
                variant="lg"
                onClick={() =>
                  router.push('/compte/restaurant/offres-regulieres')
                }
              >
                Offres régulières
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-scarlet text-white">
                  4
                </div>
              </ArrowCta>
              <ArrowCta
                variant="lg"
                onClick={() =>
                  router.push('/compte/restaurant/offres-last-minute')
                }
                withUnderline={false}
              >
                Offres last minute
              </ArrowCta>
            </div>
            <Button variant="tertiary" className="mt-6" onClick={handleLogout}>
              Déconnexion
            </Button>
          </aside>
        )}
        <div className="ml-24 flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default RestaurantAccountLayout
