import Image from 'next/image'

type LoginSignupLayoutProps = {
  children: React.ReactNode
}

const LoginSignupLayout = ({ children }: LoginSignupLayoutProps) => {
  return (
    <div>
      <header className="flex w-full items-start justify-center bg-white-rock pt-3 pb-8">
        <Image src="/full-logo.svg" width={80} height={50} />
      </header>
      {children}
    </div>
  )
}

export default LoginSignupLayout
