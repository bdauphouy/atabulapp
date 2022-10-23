import { ISignupPersonalFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const SignupPersonalFormContext =
  createContext<ISignupPersonalFormContext>(null)

export const SignupPersonalFormContextProvider = ({ children }) => {
<<<<<<< Updated upstream
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [workStatus, setWorkStatus] = useState(null)
  const [birthDate, setBirthDate] = useState('')
  const [city, setCity] = useState('')
=======
  const data = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    workStatus: null,
    birthDate: '',
    city: '',
    isLoading: false,
  }
>>>>>>> Stashed changes

  return (
    <SignupPersonalFormContext.Provider value={data}>
      {children}
    </SignupPersonalFormContext.Provider>
  )
}
