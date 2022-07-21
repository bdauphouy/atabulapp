import { Dispatch, SetStateAction } from 'react'

export type Tag = {
  type: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
  number: number
}

export type Modal =
  | 'LoginModal'
  | 'SignupFirstModal'
  | 'SignupPersonalFirstModal'
  | 'SignupPersonalSecondModal'
  | 'SignupPersonalThirdModal'
  | 'SignupPersonalFourthModal'
  | 'SignupPersonalFifthModal'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  changeModal?: (modal: Modal) => any
}

type FooterButton = {
  text: string
  action?: 'go-back' | `go-to-[/${string}]`
  customAction?: () => void
}

export type FormFooterActionsProps = {
  formId?: string
  footerLeftButton?: FooterButton
  footerRightButton?: FooterButton
}

export type TypeOfCuisineBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isDisabled: boolean
}

export type HonorsBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
