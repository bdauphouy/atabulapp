import { Offer } from '@/lib/types'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import FilterTag from '../shared/FilterTag'
import FormFooter from '../shared/FormFooter'
import BookingModal from './BookingModal'
import BookingOffer from './BookingOffer'

const daysOfTheWeek = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']

const Day = ({ date }: { date: Date }) => {
  return (
    <div className="flex flex-1 select-none flex-col items-center gap-2 rounded-md bg-scarlet/10 p-2">
      <h3 className="flex flex-col text-center text-base text-black/80">
        {daysOfTheWeek[date.getDay()]}
        <span className="font-bold">{date.getDate()}</span>
      </h3>
      <span className="text-center text-lg font-bold text-scarlet/80">
        -50%
      </span>
    </div>
  )
}

type BookingProps = {
  offers: Offer[]
}

const Booking = ({ offers: o }: BookingProps) => {
  const [isLastMinute, setIsLastMinute] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [offers, setOffers] = useState<Offer[]>(o)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const handleSlideChange = (e: { activeIndex: number }) => {
    setActiveIndex(e.activeIndex)
  }

  const days = useMemo(() => {
    const today = new Date()
    today.setDate(today.getDate() - activeIndex)
    const week = []

    for (let i = -3; i <= 3; i++) {
      const day = new Date()
      day.setDate(today.getDate() + i)
      week.push(day)
    }

    return week
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  useEffect(() => {
    if (!isLastMinute) return setOffers(o)

    setOffers(o.filter(offer => offer.type === 'lastMinute'))
  }, [isLastMinute, o])

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offer={selectedOffer}
      />
      <div className="relative h-max w-full rounded-md border-[1px] border-alto/60">
        <form
          className="flex w-full flex-col px-8 py-5"
          id="search-booking-form"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4">
            <FilterTag
              isSelected={isLastMinute}
              onChange={() => setIsLastMinute(isLastMinute => !isLastMinute)}
              size="lg"
              name="search-filters"
            >
              Last minute
            </FilterTag>
            <div className="flex w-full flex-col gap-4 rounded-md bg-alto/30 p-2 md:flex-row md:gap-0 md:rounded-full">
              <input
                type="text"
                className="border-solid border-white bg-[transparent] py-1 px-2 text-base text-black outline-none md:border-r-2"
                name="months"
                placeholder="Période"
              />
              <input
                type="text"
                className="bg-[transparent] px-2 py-1 text-base text-black outline-none"
                name="numberOfPersons"
                placeholder="Nombre de personnes"
              />
            </div>
          </div>
          {/* <div className="mt-8">
            <h3 className="mb-2 text-lg font-bold text-black">Lundi 16 mars</h3>
            <Swiper
              slidesPerView={7}
              spaceBetween={6}
              loop={true}
              className="cursor-grab active:cursor-grabbing"
              onSlideChange={handleSlideChange}
            >
              {days.map((day, index) => (
                <SwiperSlide key={index}>
                  <Day date={day} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-black">Offres</h3>
            <ul>
              {offers.map((offer, i) => (
                <li key={offer.id}>
                  <BookingOffer
                    promotion={offer.discount}
                    concernedMeal={offer.meal}
                    numberOfPersons={offer.maxRecipients}
                    id={offer.id}
                    withUnderline={i !== offers.length - 1}
                    onChange={() => setSelectedOffer(offer)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </form>
        <FormFooter
          isAbsolute={false}
          formId="search-booking-form"
          footerRightButton={{
            text: 'Réserver une table',
            customAction: () => setIsModalOpen(true),
            isDisabled: !selectedOffer,
          }}
        />
      </div>
    </>
  )
}

export default Booking
