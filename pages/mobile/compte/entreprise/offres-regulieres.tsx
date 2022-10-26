import Offer from '@/components/account/Offer'
import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import FilterTag from '@/components/shared/FilterTag'
import { ReactElement, useMemo, useState } from 'react'
import { RiAddCircleLine } from 'react-icons/ri'
import { Swiper, SwiperSlide } from 'swiper/react'

const RegularOffers = () => {
  const days = useMemo(
    () => [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
    [],
  )

  const handleAddRegularOfferClick = () => {}

  const [selectedDay, setSelectedDay] = useState(days[0])

  return (
    <div>
      <Swiper slidesPerView="auto" spaceBetween={12}>
        {days.map((day, i) => (
          <SwiperSlide key={i}>
            <FilterTag
              key={i}
              isSelected={selectedDay === day}
              onChange={() => setSelectedDay(day)}
              size="md"
              name={`offer-day-${day}s`}
              type="radio"
            >
              {day}
            </FilterTag>
          </SwiperSlide>
        ))}
      </Swiper>

      <h3 className="mt-8 mb-2 text-lg font-bold text-black">
        Les offres régulières
      </h3>
      <Offer promotion={30} concernedMeal="dinner" />
      <Offer promotion={30} concernedMeal="dinner" />
      <Offer promotion={30} concernedMeal="dinner" />
      <Offer promotion={30} concernedMeal="dinner" />
      <button
        onClick={handleAddRegularOfferClick}
        className="mt-10 flex items-center gap-2 text-lg text-scarlet"
      >
        <RiAddCircleLine size={26} />
        Ajouter une offre
      </button>
    </div>
  )
}

export default RegularOffers

RegularOffers.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Régulières">{page}</AccountLayout>
    </MobileLayout>
  )
}
