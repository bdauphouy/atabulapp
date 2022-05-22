import Head from 'next/head'
import Footer from '@/components/shared/Footer'

const Home = () => {
  return (
    <>
      <Head>
        <title>
          Atabul&apos;app - Offres et avantages pour les professionnels de la
          restauration et de l&apos;hôtellerie
        </title>
        <meta
          name="description"
          content="Atabul'app est une application qui a pour but de permettre des professionnelles de l’hôtellerie et de la restauration de profiter des avantages et des offres à d'autres pros du milieu (les étudiants, les brigades etc)."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Footer />
    </>
  )
}

export default Home
