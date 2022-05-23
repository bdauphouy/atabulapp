import { FieldError } from 'react-hook-form'

type MessageProps = {
  className?: string
  children: React.ReactNode
  type: 'error'
}

const Message = ({ className, children, type }: MessageProps) => {
  return (
    <p className={`${className} ${type === 'error' ? 'text-[#D62828]' : ''}`}>
      {children}
    </p>
  )
}

export default Message
