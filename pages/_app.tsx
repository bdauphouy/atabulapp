import Toaster from '@/components/shared/Toaster'
import { AddLastMinuteOfferFormContextProvider } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import { AddRegularOfferFormContextProvider } from '@/contexts/forms/AddRegularOfferFormContext'
import { SignupPersonalFormContextProvider } from '@/contexts/forms/SignupPersonalFormContext'
import { SignupRestaurantFormContextProvider } from '@/contexts/forms/SignupRestaurantFormContext'
import { GeolocationContextProvider } from '@/contexts/GeolocationContext'
import { HonorsContextProvider } from '@/contexts/HonorsContext'
import { SearchContextProvider } from '@/contexts/SearchContext'
import { ShowLoginModalProvider } from '@/contexts/ShowLoginModal'
import { TypesOfCuisineContextProvider } from '@/contexts/TypesOfCuisineContext'
import { UserContextProvider } from '@/contexts/UserContext'
import { RestaurantsContextProvider } from '@/contexts/RestaurantsContext'
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
              <SignupRestaurantFormContextProvider>
                <SignupPersonalFormContextProvider>
                  <AddLastMinuteOfferFormContextProvider>
                    <AddRegularOfferFormContextProvider>
                      <RestaurantsContextProvider>
                        <ShowLoginModalProvider>
                          <Head>
                            <meta
                              name="viewport"
                              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                            />

                            <title>
                              Atabulapp - Offres et avantages pour les
                              professionnels de la restauration et de
                              l'hôtellerie
                            </title>
                          </Head>
                          <Toaster />
                          {getLayout(<Component {...pageProps} />)}
                        </ShowLoginModalProvider>
                      </RestaurantsContextProvider>
                    </AddRegularOfferFormContextProvider>
                  </AddLastMinuteOfferFormContextProvider>
                </SignupPersonalFormContextProvider>
              </SignupRestaurantFormContextProvider>
            </GeolocationContextProvider>
          </TypesOfCuisineContextProvider>
        </UserContextProvider>
      </SearchContextProvider>
    </HonorsContextProvider>
  )
}

export default Atabulapp
