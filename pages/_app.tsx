import Toaster from '@/components/shared/Toaster'
import { AddRegularOfferFormContextProvider } from '@/contexts/forms/AddRegularOfferFormContext'
import { SignupCorporateFormContextProvider } from '@/contexts/forms/SignupCorporateFormContext'
import { SignupPersonalFormContextProvider } from '@/contexts/forms/SignupPersonalFormContext'
import { GeolocationContextProvider } from '@/contexts/GeolocationContext'
import { HonorsContextProvider } from '@/contexts/HonorsContext'
import { SearchContextProvider } from '@/contexts/SearchContext'
import { TypesOfCuisineContextProvider } from '@/contexts/TypesOfCuisineContext'
import { UserContextProvider } from '@/contexts/UserContext'
import '@/styles/globals.css'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import 'swiper/css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Atabulapp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <HonorsContextProvider>
      <SearchContextProvider>
        <UserContextProvider>
          <TypesOfCuisineContextProvider>
            <GeolocationContextProvider>
              <SignupCorporateFormContextProvider>
                <SignupPersonalFormContextProvider>
                  <AddRegularOfferFormContextProvider>
                    <Head>
                      <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                      />

                      <title>
                        Atabulapp - Offres et avantages pour les professionnels
                        de la restauration et de l'hôtellerie
                      </title>
                    </Head>
                    <Toaster />
                    {getLayout(<Component {...pageProps} />)}
                  </AddRegularOfferFormContextProvider>
                </SignupPersonalFormContextProvider>
              </SignupCorporateFormContextProvider>
            </GeolocationContextProvider>
          </TypesOfCuisineContextProvider>
        </UserContextProvider>
      </SearchContextProvider>
    </HonorsContextProvider>
  )
}

export default Atabulapp
