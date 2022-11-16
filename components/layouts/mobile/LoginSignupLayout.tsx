import FormFooter from '@/components/shared/FormFooter'
import { FormFooterActionsProps } from '@/lib/types'
import Image from 'next/image'
import { ReactNode } from 'react'

type LoginSignupLayoutProps = {
  hasFooter?: boolean
  children: ReactNode
  progress?: number
} & FormFooterActionsProps

const LoginSignupLayout = ({
  formId,
  footerLeftButton,
  footerRightButton,
  hasFooter = true,
  children,
  progress = 0,
}: LoginSignupLayoutProps) => {
  return (
    <div>
      <header className="fixed top-0 -z-10 flex w-full items-start justify-center bg-white-rock pt-3.5 pb-6">
        <Image
          src="/images/full-logo.svg"
          width={80}
          height={50}
          alt="Logo d'Atabulapp"
        />
      </header>
      <div className="mt-20 rounded-t-xl bg-white p-5 pb-28">{children}</div>
      {hasFooter && (
        <FormFooter
          formId={formId}
          footerLeftButton={footerLeftButton}
          footerRightButton={footerRightButton}
          isFixed
          progress={progress}
        />
      )}
    </div>
  )
}

export default LoginSignupLayout
