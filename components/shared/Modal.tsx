import FormFooter from '@/components/shared/FormFooter'
import { FormFooterActionsProps, ModalProps as MP } from '@/lib/types'
import { ReactNode, useEffect } from 'react'
import { RiArrowLeftSLine, RiCloseLine } from 'react-icons/ri'

type ModalProps = {
  title: string
  children: ReactNode
  hasFooter?: boolean
  hasHeader?: boolean
  hasGoBackArrow?: boolean
  onGoBack?: () => void
} & MP &
  FormFooterActionsProps

const Modal = ({
  title,
  children,
  isOpen,
  formId,
  footerLeftButton,
  footerRightButton,
  hasHeader = true,
  hasFooter = true,
  onClose,
  hasGoBackArrow = false,
  onGoBack,
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : null
  }, [isOpen])

  return (
    isOpen && (
      <div className="fixed left-0 top-0 z-[100] flex h-screen w-full items-center justify-center p-10">
        <div className="relative flex max-h-full w-[415px] flex-col overflow-hidden rounded-xl bg-white pb-20">
          {hasHeader && (
            <header className="flex items-start justify-between p-8 pb-3">
              {hasGoBackArrow && onGoBack && (
                <div
                  onClick={onGoBack}
                  className="cursor-pointer text-black transition-colors duration-300 hover:text-black/50"
                >
                  <RiArrowLeftSLine size={28} />
                </div>
              )}
              <h3 className="text-2xl font-bold text-black">{title}</h3>
              <div
                onClick={onClose}
                className="cursor-pointer text-black transition-colors duration-300 hover:text-black/50"
              >
                <RiCloseLine size={28} />
              </div>
            </header>
          )}
          <div className="h-full overflow-auto p-8 pt-4">{children}</div>
          {hasFooter && (
            <FormFooter
              formId={formId}
              footerLeftButton={footerLeftButton}
              footerRightButton={footerRightButton}
            />
          )}
        </div>
        <div
          onClick={onClose}
          className="fixed left-0 top-0 -z-10 h-screen w-full bg-black/40"
        ></div>
      </div>
    )
  )
}

export default Modal
