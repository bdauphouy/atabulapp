import { RiDeleteBin6Line } from 'react-icons/ri'

type OfferProps = {
  promotion: number
  concernedMeal: 'dinner' | 'lunch'
  withDrink?: boolean
  onDelete: () => void
}

const Offer = ({
  promotion,
  concernedMeal,
  withDrink = false,
  onDelete,
}: OfferProps) => {
  return (
    <div className="flex items-center gap-6 border-b-2 border-solid border-alto/30 py-4">
      <div className="rounded bg-white-rock py-1 px-2 text-xl font-medium text-scarlet">
        -{promotion}%
      </div>
      <div className="mr-auto">
        <h3 className="text-lg font-medium text-black">
          {concernedMeal === 'dinner' ? 'Diner' : 'Déjeuner'}
        </h3>
        <h4 className="text-sm uppercase text-gray">
          Réduction au menu {withDrink ? '+ boisson' : ''}
        </h4>
      </div>
      <RiDeleteBin6Line
        onClick={onDelete}
        size={20}
        className="cursor-pointer text-scarlet"
      />
    </div>
  )
}

export default Offer
