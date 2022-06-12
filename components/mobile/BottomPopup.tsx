type BottomPopupProps = {
  title: string
  subtitle?: string
  isOpen?: boolean
  children: React.ReactNode
}

const BottomPopup = ({
  title,
  subtitle,
  isOpen = false,
  children,
}: BottomPopupProps) => {
  return (
    <div
      className={`${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      } fixed bottom-0 left-0 z-10 flex max-h-96 w-full flex-col items-center overflow-auto rounded-t-lg bg-white p-5 shadow-[0_-1px_30px_30px_rgba(0,0,0,0.07)] transition-transform duration-300`}
    >
      <header className="flex flex-col items-center gap-1 bg-white text-center">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <h4 className="text-sm text-gray">{subtitle}</h4>
      </header>
      <div className="mt-6 w-full">{children}</div>
    </div>
  )
}

export default BottomPopup
