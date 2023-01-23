import { useState } from 'react'
import FilterTag from '../shared/FilterTag'
import FormFooter from '../shared/FormFooter'
import BookingModal from './BookingModal'
import BookingOffer from './BookingOffer'

const Booking = () => {
  const [isLastMinute, setIsLastMinute] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="relative h-max w-full rounded-md border-[1px] border-alto/60">
        <form
          className="flex w-full flex-col px-8 py-5"
          id="search-booking-form"
          onSubmit={e => e.preventDefault()}
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
          <div className="mt-8">
            <h3 className="text-lg font-bold text-black">Offres</h3>
            <ul>
              <li>
                <BookingOffer
                  promotion={30}
                  concernedMeal="dinner"
                  numberOfPersons={2}
                />
              </li>
              <li>
                <BookingOffer
                  promotion={30}
                  concernedMeal="dinner"
                  numberOfPersons={2}
                />
              </li>
              <li>
                <BookingOffer
                  promotion={30}
                  concernedMeal="dinner"
                  numberOfPersons={2}
                />
              </li>
              <li>
                <BookingOffer
                  promotion={30}
                  concernedMeal="dinner"
                  numberOfPersons={2}
                  withUnderline={false}
                />
              </li>
            </ul>
          </div>
        </form>
        <FormFooter
          isAbsolute={false}
          formId="search-booking-form"
          footerRightButton={{
            text: 'Réserver une table',
            customAction: () => setIsModalOpen(true),
          }}
        />
      </div>
    </>
  )
}

export default Booking
