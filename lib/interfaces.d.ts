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
  name: string
  address: string
  zipCode: string
  city: string
  phoneNumber: string
}

export interface ICorporateTwoForm {
  fullName: string
  position: string
  email: string
  phoneNumber: string
}

export interface ICorporateThreeForm {
  typesOfCuisineString: string
  typesOfCuisine: (boolean | string)[]
  honorsString: string
  honors: (boolean | string)[]
  chefFullName: string
  pastryChefFullName: string
  sommelierFullName: string
  roomManagerFullName: string
}

export interface ICorporateFourForm {
  coverPicture?: File
  additionalPictures?: File[]
}
