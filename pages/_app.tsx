import { TypesOfCuisineContextProvider } from '@/contexts/TypesOfCuisineContext'
import '@/styles/globals.css'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'swiper/css'

const queryClient = new QueryClient()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Atabulapp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <QueryClientProvider client={queryClient}>
      <TypesOfCuisineContextProvider>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />

          <title>
            Atabulapp - Offres et avantages pour les professionnels de la
            restauration et de l'hôtellerie
          </title>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </TypesOfCuisineContextProvider>
    </QueryClientProvider>
  )
}

export default Atabulapp
