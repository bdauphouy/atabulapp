import { motion } from 'framer-motion'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'

type LikeProps = {
  variant?: 'scarlet' | 'white'
  isLiked: boolean
  onClick: () => void
}

const Like = ({ variant = 'white', isLiked, onClick }: LikeProps) => {
  return (
    <button
      className={`absolute cursor-pointer ${
        variant === 'white' ? 'text-white' : 'text-scarlet'
      }`}
      onClick={onClick}
    >
      {isLiked ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="flex items-center justify-center"
        >
          <RiHeartFill
            size={32}
            className={variant === 'white' ? 'text-white' : 'text-scarlet'}
          />
        </motion.div>
      ) : (
        <div className="relative">
          <RiHeartLine size={32} className="absolute" />
          <RiHeartFill
            size={32}
            className={
              variant === 'white' ? 'text-white/40' : 'text-scarlet/40'
            }
          />
        </div>
      )}
    </button>
  )
}

export default Like
