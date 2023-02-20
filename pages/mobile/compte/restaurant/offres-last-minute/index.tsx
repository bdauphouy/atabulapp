import Offer from '@/components/account/Offer'
import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import {
  RiAddCircleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri'

const LastMinuteOffers = () => {
  const router = useRouter()

  return (
    <div>
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
          <Offer concernedMeal="lunch" promotion={30} onDelete={() => {}} />
        </li>
        <li>
          <Offer concernedMeal="lunch" promotion={30} onDelete={() => {}} />
        </li>
      </ul>
      <button
        onClick={() =>
          router.push(
            '/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/1',
          )
        }
        className="mt-8 flex items-center gap-2 text-lg text-scarlet"
      >
        <RiAddCircleLine size={26} />
        Ajouter une offre
      </button>
    </div>
  )
}

export default LastMinuteOffers

LastMinuteOffers.getLayout = (page: ReactElement) => {
  return <AccountLayout title="Last minute">{page}</AccountLayout>
}
