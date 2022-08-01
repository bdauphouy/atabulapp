import TabBar from '@/components/mobile/TabBar'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { RiArrowLeftSLine } from 'react-icons/ri'

type MobileLayoutProps = {
  children: ReactNode
  hasArrowBack?: boolean
}

const MobileLayout = ({
  children,
  hasArrowBack = false,
}: MobileLayoutProps) => {
  const router = useRouter()

  const handleGoBackClick = () => {
    router.back()
  }

  return (
    <>
      {hasArrowBack && (
        <header className="absolute top-0 left-0 z-50 p-2">
          <RiArrowLeftSLine
            size={30}
            onClick={handleGoBackClick}
            className="cursor-pointer"
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
