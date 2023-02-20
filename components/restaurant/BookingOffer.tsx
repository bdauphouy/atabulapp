import { RiMore2Fill } from 'react-icons/ri'

type BookingOfferProps = {
  promotion: number
  concernedMeal: 'dinner' | 'lunch'
  numberOfPersons: number
  withUnderline?: boolean
  id: number
}

const BookingOffer = ({
  promotion,
  concernedMeal,
  numberOfPersons,
  withUnderline = true,
  id,
}: BookingOfferProps) => {
  return (
    <div
      className={`${
        withUnderline ? 'border-b-2' : 'border-b-0'
      } flex items-center gap-6 border-alto/30 py-4 marker:border-solid`}
    >
      <input
        type="radio"
        value={`offer-${id}`}
        name="booking-offer"
        className="hidden"
        id={`offer-${id}`}
      />
      <label
        htmlFor={`offer-${id}`}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-alto/60 duration-200 after:absolute after:h-4 after:w-4 after:rounded-full after:transition-colors after:content-[''] label-checked:border-scarlet label-checked:after:bg-scarlet"
      ></label>
      <div className="mr-auto">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-black">
            {concernedMeal === 'dinner' ? 'Diner' : 'Déjeuner'}
          </h3>
          <span className="text-sm text-gray">{numberOfPersons} per.</span>
        </div>
        <h4 className="text-sm uppercase text-gray">MENU + VIN</h4>
      </div>
      <div className="rounded bg-white-rock py-1 px-2 text-xl font-medium text-scarlet">
        -{promotion}%
      </div>
    </div>
  )
}

export default BookingOffer
