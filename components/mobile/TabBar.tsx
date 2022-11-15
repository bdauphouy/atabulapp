import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { RiHeart3Line, RiHome5Line, RiUserLine } from 'react-icons/ri'
import Cookie from 'js-cookie'

const TabBar = () => {
  const router = useRouter()

  const href = useMemo(() => {
    return {
      explore: {
        url: '/mobile/explorer',
        includes: [/\/mobile\/explorer/, /\/mobile\/restaurants/],
      },
      favorites: {
        url: '/mobile/favoris',
        includes: [/\/mobile\/favoris/],
      },
      profile: {
        url: `/mobile/compte/${
          Cookie.get('accountType') === 'personal' ? 'personnel' : 'entreprise'
        }`,
        includes: [/\/mobile\/compte/],
      },
    }
  }, [])

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full bg-white px-16 py-5">
      <nav className="bg flex justify-between">
        <Link href={href.explore.url}>
          <RiHome5Line
            size={30}
            className={`${
              href.explore.includes.some(route => router.asPath.match(route))
                ? 'text-scarlet'
                : 'text-alto'
            }`}
          />
        </Link>
        <Link href={href.favorites.url}>
          <RiHeart3Line
            size={30}
            className={`${
              href.favorites.includes.some(route => router.asPath.match(route))
                ? 'text-scarlet'
                : 'text-alto'
            }`}
          />
        </Link>
        <Link href={href.profile.url}>
          <RiUserLine
            size={30}
            className={`${
              href.profile.includes.some(route => router.asPath.match(route))
                ? 'text-scarlet'
                : 'text-alto'
            }`}
          />
        </Link>
      </nav>
    </footer>
  )
}

export default TabBar
