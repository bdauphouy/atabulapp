import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const requireAuth = (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx
    const { token } = req.cookies

    console.log(req.url.startsWith('/mobile'))

    if (!token) {
      return {
        redirect: {
          destination: req.url.startsWith('/mobile')
            ? '/mobile/connexion'
            : '/',
          permanent: false,
        },
      }
    }

    return gssp(ctx)
  }
}
