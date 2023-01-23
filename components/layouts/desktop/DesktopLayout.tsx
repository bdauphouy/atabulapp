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
      <div className="flex min-h-screen flex-col">
        {hasHeader && <DesktopHeader />}
        <div className={`flex-1 ${hasHeader ? 'pt-24' : ''}`}>{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default DesktopLayout
