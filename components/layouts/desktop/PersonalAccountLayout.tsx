import ArrowCta from '@/components/shared/ArrowCta'
import Button from '@/components/shared/Button'
import Footer from '@/components/shared/Footer'
import api from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PersonalAccountLayout = ({ children, withSideMenu = true }) => {
  const router = useRouter()

  const handleLogout = () => {
    api.logout()
    router.push('/')
  }

  return (
    <>
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
      <div className="mx-auto mt-10 flex max-w-5xl">
        {withSideMenu && (
          <aside className="border-right h-full w-96 border-r-[1px] border-solid border-alto/60 py-10 pr-6">
            <ArrowCta
              variant="lg"
              onClick={() =>
                router.push('/compte/personnel/informations-personnelles')
              }
            >
              Informations personnelles
            </ArrowCta>
            <ArrowCta
              variant="lg"
              onClick={() => router.push('/compte/personnel/favoris')}
            >
              Favoris
            </ArrowCta>
            <ArrowCta
              variant="lg"
              onClick={() =>
                router.push('/compte/personnel/conditions-de-service')
              }
            >
              Conditions de service
            </ArrowCta>
            <ArrowCta
              variant="lg"
              onClick={() =>
                router.push('/compte/personnel/politique-de-confidentialite')
              }
              withUnderline={false}
            >
              Politique de confidentialité
            </ArrowCta>
            <Button variant="tertiary" className="mt-6" onClick={handleLogout}>
              Déconnexion
            </Button>
          </aside>
        )}
        <div className="ml-24 flex-1">{children}</div>
      </div>
      <Footer />
    </>
  )
}

export default PersonalAccountLayout
