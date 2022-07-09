import Button from '@/components/shared/Button'
import FormFooter from '@/components/shared/FormFooter'
import { FormFooterActionsProps } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type LaunchLayoutProps = {
  children: ReactNode
  imageFilter?: boolean
  footer?: boolean
  isLaunchScreen?: boolean
} & FormFooterActionsProps

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
        <FormFooter
          formId={formId}
          footerLeftButton={footerLeftButton}
          footerRightButton={footerRightButton}
          fixed
        />
      )}
    </div>
  )
}

export default LaunchLayout
