import { RiCloseLine } from 'react-icons/ri'
import Footer from '@/components/mobile/Footer'

type ModalProps = {
  title: string
  children: React.ReactNode
  isOpen: boolean
  formId?: string
  footerLeftButton?: {
    text: string
    action?: 'go-back' | `go-to-[/${string}]`
  }
  footerRightButton?: { text: string; action?: string }
  footer?: boolean
  onClose?: () => void
}

const Modal = ({
  title,
  children,
  isOpen,
  formId,
  footerLeftButton,
  footerRightButton,
  footer = true,
  onClose,
}: ModalProps) => {
  return (
    isOpen && (
      <>
        <div className="fixed left-1/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl bg-white">
          <header className="flex items-center justify-between p-8 pb-0">
            <h3 className="text-2xl font-bold text-black">{title}</h3>
            <div
              onClick={onClose}
              className="cursor-pointer text-black transition-colors duration-300 hover:text-black/50"
            >
              <RiCloseLine size={28} />
            </div>
          </header>
          <div className="p-8">{children}</div>
          {footer && (
            <Footer
              formId={formId}
              footerLeftButton={footerLeftButton}
              footerRightButton={footerRightButton}
            />
          )}
        </div>
        <div
          onClick={onClose}
          className="fixed z-40 h-screen w-full bg-black/40"
        ></div>
      </>
    )
  )
}

export default Modal
