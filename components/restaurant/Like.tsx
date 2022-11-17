import { motion } from 'framer-motion'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'

type LikeProps = {
  isLiked: boolean
  onClick: () => void
}

const Like = ({ isLiked, onClick }: LikeProps) => {
  return (
    <button
      className="absolute bottom-3 right-3 cursor-pointer text-white"
      onClick={onClick}
    >
      {isLiked ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.4 }}
        >
          <RiHeartFill size={32} className="text-scarlet" />
        </motion.div>
      ) : (
        <RiHeartLine size={32} />
      )}
    </button>
  )
}

export default Like
