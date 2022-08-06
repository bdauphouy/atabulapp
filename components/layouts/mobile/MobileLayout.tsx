import TabBar from '@/components/mobile/TabBar'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { RiArrowLeftSLine } from 'react-icons/ri'

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
        <header className="absolute top-0 left-0 z-50 py-2 px-3">
          <RiArrowLeftSLine
            size={30}
            onClick={handleGoBackClick}
            className="cursor-pointer text-scarlet"
          />
        </header>
      )}
      {children}
      <div className="h-20" />
      <TabBar />
    </>
  )
}

export default MobileLayout
