import Footer from '@/components/mobile/Footer'
import Button from '@/components/shared/Button'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type LaunchLayoutProps = {
  children: ReactNode
  imageFilter?: boolean
  formId?: string
  footer?: boolean
  footerLeftButton?: {
    text: string
    action?: 'go-back' | `go-to-[/${string}]`
  }
  footerRightButton?: { text: string; action?: string }
  isLaunchScreen?: boolean
}

const LaunchLayout = ({
  children,
  imageFilter = true,
  footer = true,
  formId,
  footerLeftButton,
  footerRightButton,
  isLaunchScreen = false,
}: LaunchLayoutProps) => {
  return (
    <div>
      <header className="fixed top-0 -z-10 flex h-80 w-full items-start justify-end p-4">
        <Link href="/mobile">
          <Button variant="tertiary" textColor="white">
            Accéder sans connexion
          </Button>
        </Link>
        <Image
          objectFit="cover"
          src="/images/login-image.png"
          layout="fill"
          alt="Cuisinier en pleine action"
          className={`-z-10 ${imageFilter ? 'brightness-75' : ''}`}
        />
      </header>
      <div
        className={`${
          isLaunchScreen ? 'mt-80' : 'mt-52'
        } w-full rounded-t-xl bg-white p-5 pb-28`}
      >
        {children}
      </div>
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

export default LaunchLayout
