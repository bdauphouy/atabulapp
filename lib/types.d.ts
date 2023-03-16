export type ToastType = 'success' | 'error'

export type Tag = {
  type: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
  number: number
}

export type Honor = {
  title: string
  tag: Tag
}

type SignupType = 'Restaurant' | 'Personal'
type OfferType = 'Regular' | 'LastMinute'

export type Modal =
  | 'LoginModal'
  | 'SignupFirstModal'
  | `Signup${SignupType}FirstModal`
  | `Signup${SignupType}SecondModal`
  | `Signup${SignupType}ThirdModal`
  | `Signup${SignupType}FourthModal`
  | `Signup${SignupType}FifthModal`
  | 'SignupRestaurantSixthModal'
  | 'SettingsModal'
  | `Add${OfferType}OfferFirstModal`
  | `Add${OfferType}OfferSecondModal`
  | `Add${OfferType}OfferThirdModal`
  | `Add${OfferType}OfferFourthModal`
  | 'AskToLoginModal'

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
  queries?: Record<string, string | number | string[] | number[]>
  token?: string
  external?: boolean
}

type ApiPostParams = {
  route: string
  body: string | FormData
  token?: string
  isFormData?: boolean
}

type ApiDeleteParams = {
  route: string
  queries?: Record<string, string | number>
  token?: string
  body?: string
}

type ApiPutParams = {
  route: string
  body: string | FormData
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
  phone: string
}

type ApiUpdateUserData = {
  email: string
  phone: string
}

type ApiSignupRestaurantData = {
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

type ApiUpdateRestaurantData = {
  id: string
  name: string
  address: string
  zipCode: string
  city: string
  coordinates: string
  phone: string
  email: string
  password: string
  headChefFullName: string
  pastryChefFullName: string
  sommelierFullName: string
  restaurantManagerFullName: string
  isEmailConfirmed: boolean
}

type ApiGetDiscountsParams = {
  latitude: number
  longitude: number
  limit: number
  skip: number
}

type ApiLoginData = {
  email: string
  password: string
}

type CalendarOffer = {
  date: string
}

type Offer = {
  id?: number
  date: Date
  meal: 'lunch' | 'dinner'
  discount: number
  unit: 'percent'
  type: 'regular' | 'lastMinute'
  maxRecipients: number
  offer: 'foodWithDrink' | 'onlyFood'
  restaurantId?: number
}
