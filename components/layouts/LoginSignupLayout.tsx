import Image from 'next/image'
import Footer from '@/components/mobile/Footer'

type LoginSignupLayoutProps = {
  formId: string
  footerLeftButton?: {
    text: string
    action?: 'go-back' | `go-to-[/${string}]`
  }
  footerRightButton?: { text: string; action?: string }
  footer?: boolean
  children: React.ReactNode
}

const LoginSignupLayout = ({
  formId,
  footerLeftButton,
  footerRightButton,
  footer = true,
  children,
}: LoginSignupLayoutProps) => {
  return (
    <div>
      <header className="fixed top-0 -z-10 flex w-full items-start justify-center bg-white-rock pt-3.5 pb-12">
        <Image src="/full-logo.svg" width={80} height={50} />
      </header>
      <div className="mt-20 rounded-t-xl bg-white p-5 pb-28">{children}</div>
      {footer && (
        <Footer
          formId={formId}
          footerLeftButton={footerLeftButton}
          footerRightButton={footerRightButton}
        />
      )}
    </div>
  )
}

export default LoginSignupLayout
