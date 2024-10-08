import { SetStateAction } from 'react'
import { WorkStatus } from './types'

export interface ILoginForm {
  accountType: 'personal' | 'restaurant'
  email: string
  password: string
  stayLoggedIn: boolean
}

export interface IForgotPasswordForm {
  email: string
}

export interface IChangePasswordForm {
  password: string
  confirmPassword: string
}

export interface ISignupForm {
  person: 'personal' | 'restaurant'
}

export interface IPersonalTwoForm {
  email: string
  lastName: string
  firstName: string
  birthDate: string
  city: string
  password: string
  phoneNumber: string
  workStatus: WorkStatus
}

export interface IPersonalThreeForm {
  schoolCertificate?: File
  proofOfIdentity?: File
  workCertificate?: File
}

export interface IRestaurantOneForm {
  email: string
  password: string
}

export interface IRestaurantTwoForm {
  name: string
  address: string
  zipCode: string
  city: string
  phoneNumber: string
}

export interface IRestaurantThreeForm {
  privilegedFullName: string
  privilegedPosition: string
  privilegedEmail: string
  privilegedPhoneNumber: string
}

export interface IRestaurantFourForm {
  typesOfCuisineString: string
  typesOfCuisine: (boolean | string)[]
  honorsString: string
  honors: (boolean | string)[]
  chefFullName: string
  pastryChefFullName: string
  sommelierFullName: string
  roomManagerFullName: string
}

export interface IRestaurantFiveForm {
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
  honors: string[]
  meals: string[]
  typesOfCuisine: string[]
  dates: string[]
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
  proofOfIdentity?: File
  workCertificate?: File
}

export interface IRestaurantSettingsForm {
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
  phoneNumber: string
}

export interface IRestaurantPicturesForm {
  coverPicture?: File
  additionalPictures?: File[]
}

export interface IAddRegularOfferFirstForm {
  offerDays: (string | undefined)[]
}

export interface IAddRegularOfferSecondForm {
  concernedMeal: 'lunch' | 'dinner'
  withDrink: 'withDrink' | 'withoutDrink'
  numberOfBeneficiaries: string[]
}

export interface IAddRegularOfferThirdForm {
  discount: string
}

export interface IAddLastMinuteOfferFirstForm {
  offerDay: Date
}

export interface IAddLastMinuteOfferSecondForm {
  concernedMeal: 'lunch' | 'dinner'
  withDrink: 'withDrink' | 'withoutDrink'
  numberOfBeneficiaries: string[]
}

export interface IAddLastMinuteOfferThirdForm {
  discount: string
}

export interface User extends IPersonalSettingsForm, IRestaurantSettingsForm {
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
    IAddRegularOfferThirdForm {
  hasReachedConfirmation: boolean
  setData: Dispatch<SetStateAction<Partial<IAddRegularOfferFormContext>>>
}

export interface IAddLastMinuteOfferFormContext
  extends IAddLastMinuteOfferFirstForm,
    IAddLastMinuteOfferSecondForm,
    IAddLastMinuteOfferThirdForm {
  hasReachedConfirmation: boolean
  setData: Dispatch<SetStateAction<Partial<IAddLastMinuteOfferFormContext>>>
}

export interface ISignupPersonalFormContext
  extends IPersonalTwoForm,
    IPersonalThreeForm {
  setData: Dispatch<SetStateAction<Partial<ISignupPersonalFormContext>>>
}

export interface ISignupRestaurantFormContext
  extends IRestaurantOneForm,
    IRestaurantTwoForm,
    IRestaurantThreeForm,
    IRestaurantFourForm,
    IRestaurantFiveForm {
  setData: Dispatch<SetStateAction<Partial<ISignupRestaurantFormContext>>>
}

export interface IShowLoginModalContext {
  showLoginModal: boolean
  setShowLoginModal: Dispatch<SetStateAction<boolean>>
}
