import Button from '@/components/shared/Button'
import FormFooter from '@/components/shared/FormFooter'
import { FormFooterActionsProps } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type LaunchLayoutProps = {
  children: ReactNode
  imageFilter?: boolean
  hasFooter?: boolean
  isLaunchScreen?: boolean
} & FormFooterActionsProps

const LaunchLayout = ({
  children,
  imageFilter = true,
  hasFooter = true,
  formId,
  footerLeftButton,
  footerRightButton,
  isLaunchScreen = false,
}: LaunchLayoutProps) => {
  const router = useRouter()

  return (
    <div>
      <header className="fixed top-0 -z-10 flex h-80 w-full items-start justify-end p-4">
        <Button
          variant="tertiary"
          textColor="white"
          onClick={() => router.push('/mobile/explorer')}
          className="z-10"
        >
          Accéder sans connexion
        </Button>
        <Image
          objectFit="cover"
          src="/images/login-image.png"
          layout="fill"
          alt="Cuisinier en pleine action"
          className={`-z-20 ${imageFilter ? 'brightness-75' : ''}`}
        />
      </header>
      <div
        className={`${
          isLaunchScreen ? 'mt-80' : 'mt-48'
        } w-full rounded-t-xl bg-white p-5 pb-28`}
      >
        {children}
      </div>
      {hasFooter && (
        <FormFooter
          formId={formId}
          footerLeftButton={footerLeftButton}
          footerRightButton={footerRightButton}
          isFixed
        />
      )}
    </div>
  )
}

export default LaunchLayout
