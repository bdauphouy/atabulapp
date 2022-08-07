import { ReactNode } from 'react'

type ResultProps = {
  children: ReactNode
  withUnderline?: boolean
}

const Result = ({ children, withUnderline = false }) => {
  return (
    <div
      className={`${
        withUnderline ? 'border-b-2 border-solid border-alto/30' : ''
      } py-4 text-lg text-black`}
    >
      {children}
    </div>
  )
}

export default Result
