import { ReactNode } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type LocationCTAProps = {
  children: ReactNode
  onClick: () => void
}

const LocationCTA = ({ children, onClick }: LocationCTAProps) => {
  return (
    <div
      className="group flex cursor-pointer justify-between py-3"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 text-base text-black">
        {children}
      </div>
      <RiArrowRightSLine
        size={28}
        className="transition-transform xl:group-hover:translate-x-2"
      />
    </div>
  )
}

export default LocationCTA
