import Footer from '@/components/shared/Footer'

type DesktopLayoutProps = {
  children: React.ReactNode
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
