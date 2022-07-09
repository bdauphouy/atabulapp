import FormFooter from '@/components/shared/FormFooter'
import { FormFooterActionsProps } from '@/lib/types'
import Image from 'next/image'
import { ReactNode } from 'react'

type LoginSignupLayoutProps = {
  footer?: boolean
  children: ReactNode
} & FormFooterActionsProps

const LoginSignupLayout = ({
  formId,
  footerLeftButton,
  footerRightButton,
  footer = true,
  children,
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

export default LoginSignupLayout
