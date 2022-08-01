import { Toaster as T } from 'react-hot-toast'

const Toaster = () => {
  return (
    <T
      toastOptions={{
        style: {
          boxShadow: 'none',
          borderRadius: 6,
        },
      }}
    />
  )
}

export default Toaster
