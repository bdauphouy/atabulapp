import { useRouter } from 'next/router'
import { RiArrowLeftSLine } from 'react-icons/ri'

const AccountLayout = ({ children, title, isTransparent = false }) => {
  const router = useRouter()

  return (
    <>
      <header
        className={`z-10 flex items-center justify-between gap-4 px-5 py-6 ${
          isTransparent ? 'bg-transparent' : 'bg-white'
        }`}
      >
        <RiArrowLeftSLine
          onClick={() => router.back()}
          size={36}
          className={`flex-shrink-0 cursor-pointer ${
            isTransparent ? 'text-white' : 'text-black'
          }`}
        />
        <h2
          className={`text-3xl font-bold ${
            isTransparent ? 'text-white' : 'text-black'
          }`}
        >
          {title}
        </h2>
        <div className="w-9"></div>
      </header>
      <div className="px-5">{children}</div>
    </>
  )
}

export default AccountLayout
