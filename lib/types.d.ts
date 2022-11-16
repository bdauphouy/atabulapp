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

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  changeModal?: (modal: Modal) => any
}

type FooterButton = {
  text: string
  action?: 'go-back' | `go-to-[/${string}]`
  customAction?: () => void
  isLoading?: boolean
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

export type WorkStatus = 'student' | 'employee'

export type ApiGetParams = {
  route: string
  queries?: Record<string, string | number>
  token?: string
}

type ApiPostParams = {
  route: string
  body: string | FormData
  token?: string
  isFormData?: boolean
}

type ApiDeleteParams = {
  route: string
  queries: Record<string, string | number>
  token?: string
}

type ApiSignupUserData = {
  email: string
  password: string
  firstName: string
  lastName: string
  workStatus: WorkStatus
  birthDate: string
  city: string
}

type ApiSignupCorporateData = {
  name: string
  address: string
  zipCode: string
  city: string
  phone: string
  email: string
  password: string
  coordinates: string
  preferredContact: {
    fullName: string
    email: string
    phone: string
  }
  types: number[]
  distinctions: number[]
  headChefFullName?: string
  pastryChefFullName?: string
  sommelierFullName?: string
  restaurantManagerFullName?: string
}

type ApiLoginData = {
  email: string
  password: string
}

type Offer = {
  startDate: string
}
