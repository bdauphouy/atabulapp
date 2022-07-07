import Footer from '@/components/shared/Footer'
import { ReactNode } from 'react'

type DesktopLayoutProps = {
  children: ReactNode
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default DesktopLayout
