import { WorkStatus } from './types'

export interface ILoginForm {
  email: string
  password: string
  stayLoggedIn: boolean
}

export interface ISignupForm {
  person: 'personal' | 'corporate'
}

export interface IPersonalTwoForm {
  email: string
  lastName: string
  firstName: string
  birthDate: string
  city: string
  password: string
  workStatus: WorkStatus
}

export interface IPersonalThreeForm {
  schoolCertificate?: File
  proofOfIdentity?: File
  workCertificate?: File
}

export interface ICorporateOneForm {
  email: string
  password: string
}

export interface ICorporateTwoForm {
  name: string
  address: string
  zipCode: string
  city: string
  phoneNumber: string
}

export interface ICorporateThreeForm {
  privilegedFullName: string
  privilegedPosition: string
  privilegedEmail: string
  privilegedPhoneNumber: string
}

export interface ICorporateFourForm {
  typesOfCuisineString: string
  typesOfCuisine: (boolean | string)[]
  honorsString: string
  honors: (boolean | string)[]
  chefFullName: string
  pastryChefFullName: string
  sommelierFullName: string
  roomManagerFullName: string
}

export interface ICorporateFiveForm {
  coverPicture?: File
  additionalPictures?: File[]
}

export interface ISearchForm {
  location?: string
  period?: string
  numberOfPersons?: number
  honors?: string[]
  isLastMinute?: boolean
}

export interface IExploreFiltersForm {
  search: string
  honors: (boolean | string)[]
}

export interface ISettingsForm {
  authorizeNewsletters: boolean
  authorizeLocation: boolean
  authorizeAll: boolean
}

export interface IPersonalSettingsForm {
  lastName: string
  firstName: string
  location: string
  email: string
  phoneNumber: string
}

export interface ICorporateSettingsForm {
  name: string
  address: string
  zipCode: string
  city: string
  typeOfCuisine: string
  honors: string
  chefFullName: string
  pastryChefFullName: string
  sommelierFullName: string
  roomManagerFullName: string
}

export interface ICorporatePicturesForm {
  coverPicture?: File
}

export interface IAddRegularOfferFirstForm {
  offerDays: (Day | undefined)[]
}

export interface IAddRegularOfferSecondForm {
  concernedMeal: 'lunch' | 'dinner'
  withDrinks: 'withDrinks' | 'withoutDrinks'
  numberOfBeneficiaries: string[]
}

export interface IAddRegularOfferThirdForm {
  discount: string
}

export interface IAddRegularOfferFourthForm {}

export interface User extends IPersonalSettingsForm, ICorporateSettingsForm {
  isSubscribedNewsletter: boolean
  isIdentityValid: boolean
  IsCertificateValid: boolean
  id: number
  stripeCustomerId: string
}

export interface IUserContext {
  user: User
  setUser: (user: User) => void
}

export interface IAddRegularOfferFormContext
  extends IAddRegularOfferFirstForm,
    IAddRegularOfferSecondForm,
    IAddRegularOfferThirdForm,
    IAddRegularOfferFourthForm {
  setOfferDays: React.Dispatch<React.SetStateAction<(Day | undefined)[]>>
  setConcernedMeal: React.Dispatch<React.SetStateAction<'lunch' | 'dinner'>>
  setWithDrinks: React.Dispatch<
    React.SetStateAction<'withDrinks' | 'withoutDrinks'>
  >
  setNumberOfBeneficiaries: React.Dispatch<React.SetStateAction<string[]>>
  setDiscount: React.Dispatch<React.SetStateAction<string>>
  hasReachedConfirmation: boolean
  setHasReachedConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISignupPersonalFormContext extends IPersonalTwoForm {
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setLastName: React.Dispatch<React.SetStateAction<string>>
  setFirstName: React.Dispatch<React.SetStateAction<string>>
  setBirthDate: React.Dispatch<React.SetStateAction<string>>
  setCity: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setWorkStatus: React.Dispatch<React.SetStateAction<WorkStatus>>
}

export interface ISignupCorporateFormContext
  extends ICorporateOneForm,
    ICorporateTwoForm,
    ICorporateThreeForm,
    ICorporateFourForm,
    ICorporateFiveForm {}
