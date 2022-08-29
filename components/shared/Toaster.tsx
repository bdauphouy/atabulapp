import { Toaster as T } from 'react-hot-toast'

const Toaster = () => {
  return (
    <T
      toastOptions={{
        style: {
          boxShadow: 'none',
          borderRadius: 6,
          border: '1px solid #e0e0e0',
        },
      }}
    />
  )
}

export default Toaster
