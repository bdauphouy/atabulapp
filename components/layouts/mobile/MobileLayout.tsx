import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { RiArrowLeftSLine } from 'react-icons/ri'

const TabBar = dynamic(import('@/components/mobile/TabBar'), { ssr: false })

type MobileLayoutProps = {
  children: ReactNode
  withArrowBack?: boolean
}

const MobileLayout = ({
  children,
  withArrowBack = false,
}: MobileLayoutProps) => {
  const router = useRouter()

  const handleGoBackClick = () => {
    router.back()
  }

  return (
    <>
      {withArrowBack && (
        <header className="absolute top-0 left-0 z-50 p-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <RiArrowLeftSLine
              size={30}
              onClick={handleGoBackClick}
              className="cursor-pointer text-scarlet"
            />
          </div>
        </header>
      )}
      {children}
      <div className="h-20"></div>
      <TabBar />
    </>
  )
}

export default MobileLayout
