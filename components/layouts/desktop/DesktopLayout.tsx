import Footer from '@/components/shared/Footer'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const DesktopHeader = dynamic(import('@/components/desktop/DesktopHeader'), {
  ssr: false,
})

type DesktopLayoutProps = {
  children: ReactNode
  hasHeader?: boolean
}

const DesktopLayout = ({ children, hasHeader = true }: DesktopLayoutProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {hasHeader && <DesktopHeader />}
        <div className={`flex-1 ${hasHeader ? 'pt-10' : ''}`}>{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default DesktopLayout
