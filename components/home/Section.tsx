import useMediaMatch from '@rooks/use-media-match'
import { ReactNode } from 'react'
import { Swiper } from 'swiper/react'

type SectionProps = {
  title: string
  children: ReactNode
  isGrid?: boolean
  isSwiper?: boolean
}

const Section = ({
  title,
  children,
  isGrid,
  isSwiper = false,
}: SectionProps) => {
  const swiperFirstBreakpoint = useMediaMatch('(max-width: 1600px)')
  const swiperSecondBreakpoint = useMediaMatch('(max-width: 1024px)')

  return (
    <div>
      <h3 className="px-6 text-2xl font-bold text-black xl:px-32">{title}</h3>
      {isSwiper ? (
        <Swiper
          spaceBetween={24}
          slidesPerView={
            swiperSecondBreakpoint ? 1 : swiperFirstBreakpoint ? 2 : 3.5
          }
          className="swiper-section mt-4"
        >
          {children}
        </Swiper>
      ) : (
        <div
          className={`mt-4 gap-6 px-6 xl:px-32 ${
            isGrid ? 'grid grid-cols-1 lg:grid-cols-2' : 'flex overflow-auto'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Section
