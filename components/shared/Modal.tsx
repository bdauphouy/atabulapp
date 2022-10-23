import FormFooter from '@/components/shared/FormFooter'
import { FormFooterActionsProps, ModalProps as MP } from '@/lib/types'
import { ReactNode } from 'react'
import { RiArrowLeftSLine, RiCloseLine } from 'react-icons/ri'

type ModalProps = {
  title: string
  children: ReactNode
  hasFooter?: boolean
  hasHeader?: boolean
  hasGoBackArrow?: boolean
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
}: ModalProps) => {
  return (
    isOpen && (
      <>
        <div className="fixed left-1/2 top-1/2 z-[100] w-[415px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl bg-white pb-20">
          {hasHeader && (
            <header className="flex items-start justify-between p-8 pb-0">
              {hasGoBackArrow && (
                <div
                  onClick={onClose}
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
          <div className="p-8">{children}</div>
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
          className="fixed left-0 top-0 z-40 h-screen w-full bg-black/40"
        ></div>
      </>
    )
  )
}

export default Modal
