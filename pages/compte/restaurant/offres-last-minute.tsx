import Calendar from '@/components/account/Calendar'
import Offer from '@/components/account/Offer'
import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import useModal from '@/lib/hooks/useModal'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import { startOfToday } from 'date-fns'
import { ReactElement, useContext, useState } from 'react'
import {
  RiAddCircleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri'

export const getServerSideProps = requireAuth(async () => ({
  props: {
    offers: [
      {
        startDate: '2023-01-20',
      },
      {
        startDate: '2023-01-04',
      },
      {
        startDate: '2023-01-09',
      },
    ],
  },
}))

const LastMinuteOffers = ({ offers }) => {
  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

  const [isAddLastMinuteOfferModalOpen, setIsAddLastMinuteOfferModalOpen] =
    useState(false)
  const [selectedDay, setSelectedDay] = useState(
    previousData.offerDay ?? startOfToday(),
  )

  const handleAddLastMinuteOfferClick = () => {
    setIsAddLastMinuteOfferModalOpen(true)
  }

  const { Modal, changeModal } = useModal('AddLastMinuteOfferFirstModal')

  return (
    <div>
      <Modal
        isOpen={isAddLastMinuteOfferModalOpen}
        onClose={() => setIsAddLastMinuteOfferModalOpen(false)}
        changeModal={changeModal}
      />
      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        offers={offers}
      />
      <div className="mt-10">
        <header className="flex items-center justify-between gap-6">
          <h3 className="text-lg font-bold capitalize text-black">
            jeudi 07 avril
          </h3>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="rounded-full border-[1px] border-solid border-scarlet p-0.5 hover:text-gray"
            >
              <RiArrowLeftSLine size={16} className="text-scarlet" />
            </button>
            <button
              type="button"
              className="rounded-full border-[1px] border-solid border-scarlet p-0.5"
            >
              <RiArrowRightSLine size={16} className="text-scarlet" />
            </button>
          </div>
        </header>
        <ul>
          <li>
            <Offer concernedMeal="lunch" promotion={30} />
          </li>
          <li>
            <Offer concernedMeal="lunch" promotion={30} />
          </li>
        </ul>
        <button
          onClick={handleAddLastMinuteOfferClick}
          className="mt-8 flex items-center gap-2 text-lg text-scarlet"
        >
          <RiAddCircleLine size={26} />
          Ajouter une offre
        </button>
      </div>
    </div>
  )
}

export default LastMinuteOffers

LastMinuteOffers.getLayout = (page: ReactElement) => (
  <RestaurantAccountLayout>{page}</RestaurantAccountLayout>
)
