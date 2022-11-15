import Button from '@/components/shared/Button'
import Footer from '@/components/shared/Footer'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 py-20">
        <div className="mx-auto max-w-4xl">
          <header className="relative mb-10 h-52 w-full">
            <Image
              src="/images/header-not-found.png"
              layout="fill"
              alt="Bandeau page non trouvée"
            ></Image>
          </header>
          <div className="flex flex-col items-center gap-8">
            <h2 className="flex flex-col items-center text-7xl font-bold italic text-scarlet">
              <span className="text-sm font-normal uppercase">Erreur</span>404
            </h2>
            <p className="max-w-xs text-center text-2xl italic text-gray">
              Désolé, il semblerait que cette page n’existe pas...
            </p>
            <Button variant="primary" onClick={() => router.push('/')}>
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
