import Footer from '@/components/shared/Footer'
import { ReactNode } from 'react'
import DesktopHeader from '../../desktop/DesktopHeader'

type DesktopLayoutProps = {
  children: ReactNode
  hasHeader?: boolean
}

const DesktopLayout = ({ children, hasHeader = true }: DesktopLayoutProps) => {
  return (
    <>
      {hasHeader && <DesktopHeader />}
      {children}
      <Footer />
    </>
  )
}

export default DesktopLayout
