import { useRouter } from 'next/router'
import { RiArrowLeftSLine } from 'react-icons/ri'

const AccountLayout = ({ children, title }) => {
  const router = useRouter()

  return (
    <>
      <header className="flex items-center justify-between gap-4 bg-white px-5 py-6">
        <RiArrowLeftSLine
          onClick={() => router.back()}
          size={36}
          className="flex-shrink-0 cursor-pointer"
        />
        <h2 className="text-3xl font-bold text-black">{title}</h2>
        <div className="w-9"></div>
      </header>
      <div className="px-5">{children}</div>
    </>
  )
}

export default AccountLayout
