export type ToastType = 'success' | 'error'

export type Tag = {
  type: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
  number: number
}

export type Honor = {
  title: string
  tag: Tag
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
  | 'SettingsModal'
  | 'AddRegularOfferFirstModal'
  | 'AddRegularOfferSecondModal'
  | 'AddRegularOfferThirdModal'
  | 'AddRegularOfferFourthModal'
  | 'AddRegularOfferFifthModal'

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

export type FilterCategory =
  | 'Filtres'
  | 'Distinctions'
  | 'Repas'
  | 'Type de cuisine'
  | 'Date'

export type SelectedFilters = {
  honorsString: string
}

export type Day =
  | 'Lundi'
  | 'Mardi'
  | 'Mercredi'
  | 'Jeudi'
  | 'Vendredi'
  | 'Samedi'
  | 'Dimanche'
