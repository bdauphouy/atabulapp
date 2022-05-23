import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <title>
          Atabulapp - Offres et avantages pour les professionnels de la
          restauration et de l'hôtellerie
        </title>
        <meta
          name="description"
          content="Atabul'app est une application qui a pour but de permettre des professionnelles de l’hôtellerie et de la restauration de profiter des avantages et des offres à d'autres pros du milieu (les étudiants, les brigades etc)."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
