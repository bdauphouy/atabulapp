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
  workStatus: 'student' | 'employee'
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
  fullName: string
  position: string
  email: string
  phoneNumber: string
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
  numberOfPersons?: string
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
