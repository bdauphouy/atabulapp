import { GetServerSidePropsContext } from 'next'
import api from '../api'
import { User } from '../interfaces'

export const requireAuth = (
  gssp: (ctx: GetServerSidePropsContext, user: User) => any,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx
    const { token } = req.cookies

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

    const { error, user } = await api.me(token)

    if (error) {
      return {
        redirect: {
          destination: req.url.startsWith('/mobile')
            ? '/mobile/connexion'
            : '/',
          permanent: false,
        },
      }
    }

    return gssp(ctx, user)
  }
}
