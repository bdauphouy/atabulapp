import { ReactComponentElement, SetStateAction } from 'react'

export type Tag = {
  type: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
  number: number
}

export type Modal = 'LoginModal' | 'SignupFirstModal'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  changeModal?: (modal: Modal) => SetStateAction<ReactComponentElement>
}

export type FormFooterActionsProps = {
  formId?: string
  footerLeftButton?: {
    text: string
    action?: 'go-back' | `go-to-[/${string}]`
    customAction?: () => void
  }
  footerRightButton?: { text: string; action?: string }
}

export type TypeOfCuisineBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: SetStateAction<boolean>
  isDisabled: boolean
}

export type HonorsBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: SetStateAction<boolean>
}
