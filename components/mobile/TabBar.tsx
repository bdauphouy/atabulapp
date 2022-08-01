import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { RiHeart3Line, RiHome5Line, RiUserLine } from 'react-icons/ri'

const TabBar = () => {
  const router = useRouter()

  const href = useMemo(() => {
    return {
      explore: '/mobile/explorer',
      favorites: '/mobile/favoris',
      profile: '/mobile/profil',
    }
  }, [])

  console.log(router.asPath)

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-white px-16 py-5">
      <nav className="bg flex justify-between">
        <Link href={href.explore}>
          <RiHome5Line
            size={30}
            className={`${
              router.asPath === href.explore ? 'text-scarlet' : 'text-alto'
            }`}
          />
        </Link>
        <Link href={href.favorites}>
          <RiHeart3Line
            size={30}
            className={`${
              router.asPath === href.favorites ? 'text-scarlet' : 'text-alto'
            }`}
          />
        </Link>
        <Link href={href.profile}>
          <RiUserLine
            size={30}
            className={`${
              router.asPath === href.profile ? 'text-scarlet' : 'text-alto'
            }`}
          />
        </Link>
      </nav>
    </footer>
  )
}

export default TabBar
