import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { ISignupCorporateFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const SignupCorporateFormContext =
  createContext<ISignupCorporateFormContext>(null)

export const SignupCorporateFormContextProvider = ({ children }) => {
  const [data, setData, removeData] = useLocalStorage(
    'signup-corporate-form-data',
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
    <SignupCorporateFormContext.Provider
      value={{ ...data, setData, removeData }}
    >
      {children}
    </SignupCorporateFormContext.Provider>
  )
}
