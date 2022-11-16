import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { ISignupRestaurantFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const SignupRestaurantFormContext =
  createContext<ISignupRestaurantFormContext>(null)

export const SignupRestaurantFormContextProvider = ({ children }) => {
  const [data, setData, removeData] = useLocalStorage(
    'signup-restaurant-form-data',
    {
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
    },
  )

  return (
    <SignupRestaurantFormContext.Provider
      value={{ ...data, setData, removeData }}
    >
      {children}
    </SignupRestaurantFormContext.Provider>
  )
}
