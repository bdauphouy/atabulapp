import { ISignupCorporateFormContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const SignupCorporateFormContext =
  createContext<ISignupCorporateFormContext>(null)

export const SignupCorporateFormContextProvider = ({ children }) => {
  const data = {
    email: '',
    password: '',
    name: '',
    address: '',
    zipCode: '',
    city: '',
    phoneNumber: '',
    privilegedFullName: '',
    privilegedPosition: '',
    privilegedEmail: '',
    privilegedPhoneNumber: '',
    typesOfCuisineString: '',
    typesOfCuisine: [],
    honorsString: '',
    honors: [],
    chefFullName: '',
    pastryChefFullName: '',
    sommelierFullName: '',
    roomManagerFullName: '',
    coverPicture: null,
    additionalPictures: [],
  }

  return (
    <SignupCorporateFormContext.Provider value={data}>
      {children}
    </SignupCorporateFormContext.Provider>
  )
}
