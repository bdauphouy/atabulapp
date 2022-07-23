import { Dispatch, SetStateAction } from 'react'

export type Tag = {
  type: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
  number: number
}

type SignupType = 'Corporate' | 'Personal'
export type Modal =
  | 'LoginModal'
  | 'SignupFirstModal'
  | `Signup${SignupType}FirstModal`
  | `Signup${SignupType}SecondModal`
  | `Signup${SignupType}ThirdModal`
  | `Signup${SignupType}FourthModal`
  | `Signup${SignupType}FifthModal`
  | 'SignupCorporateSixthModal'

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
