import { ISignupRestaurantFormContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const SignupRestaurantFormContext =
  createContext<ISignupRestaurantFormContext>(null)

export const SignupRestaurantFormContextProvider = ({ children }) => {
  const [data, setData] = useState({
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
  })

  return (
    <SignupRestaurantFormContext.Provider value={{ ...data, setData }}>
      {children}
    </SignupRestaurantFormContext.Provider>
  )
}
