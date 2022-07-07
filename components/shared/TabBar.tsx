import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiHeart3Line, RiHome5Line, RiUserLine } from 'react-icons/ri'

const TabBar = () => {
  const router = useRouter()

  return (
    <footer className="fixed bottom-0 left-0 w-full px-16 py-5">
      <nav className="bg flex justify-between">
        <Link href="/">
          <RiHome5Line size={30} className="text-scarlet" />
        </Link>
        <Link href="/j-aime">
          <RiHeart3Line size={30} className="text-alto" />
        </Link>
        <Link href="/profil">
          <RiUserLine size={30} className="text-alto" />
        </Link>
      </nav>
    </footer>
  )
}

export default TabBar
