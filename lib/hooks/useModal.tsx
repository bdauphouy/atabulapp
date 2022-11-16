import AddRegularOfferFirstModal from '@/components/desktop/modals/account/offers/regular/AddRegularOfferFirstModal'
import AddRegularOfferFourthModal from '@/components/desktop/modals/account/offers/regular/AddRegularOfferFourthModal'
import AddRegularOfferSecondModal from '@/components/desktop/modals/account/offers/regular/AddRegularOfferSecondModal'
import AddRegularOfferThirdModal from '@/components/desktop/modals/account/offers/regular/AddRegularOfferThirdModal'
import LoginModal from '@/components/desktop/modals/LoginModal'
import SettingsModal from '@/components/desktop/modals/SettingsModal'
import SignupPersonalFifthModal from '@/components/desktop/modals/signup/personal/SignupPersonalFifthModal'
import SignupPersonalFirstModal from '@/components/desktop/modals/signup/personal/SignupPersonalFirstModal'
import SignupPersonalFourthModal from '@/components/desktop/modals/signup/personal/SignupPersonalFourthModal'
import SignupPersonalSecondModal from '@/components/desktop/modals/signup/personal/SignupPersonalSecondModal'
import SignupPersonalThirdModal from '@/components/desktop/modals/signup/personal/SignupPersonalThirdModal'
import SignupRestaurantFifthModal from '@/components/desktop/modals/signup/restaurant/SignupRestaurantFifthModal'
import SignupRestaurantFirstModal from '@/components/desktop/modals/signup/restaurant/SignupRestaurantFirstModal'
import SignupRestaurantFourthModal from '@/components/desktop/modals/signup/restaurant/SignupRestaurantFourthModal'
import SignupRestaurantSecondModal from '@/components/desktop/modals/signup/restaurant/SignupRestaurantSecondModal'
import SignupRestaurantSixthModal from '@/components/desktop/modals/signup/restaurant/SignupRestaurantSixthModal'
import SignupRestaurantThirdModal from '@/components/desktop/modals/signup/restaurant/SignupRestaurantThirdModal'
import SignupFirstModal from '@/components/desktop/modals/signup/SignupFirstModal'
import { useCallback, useMemo, useState } from 'react'
import { Modal } from '../types'

const useModal = (defaultActiveModal: Modal) => {
  const modals = useMemo(() => {
    return {
      LoginModal,
      SignupFirstModal,
      SignupPersonalFirstModal,
      SignupPersonalSecondModal,
      SignupPersonalThirdModal,
      SignupPersonalFourthModal,
      SignupPersonalFifthModal,
      SignupRestaurantFirstModal,
      SignupRestaurantSecondModal,
      SignupRestaurantThirdModal,
      SignupRestaurantFourthModal,
      SignupRestaurantFifthModal,
      SignupRestaurantSixthModal,
      SettingsModal,
      AddRegularOfferFirstModal,
      AddRegularOfferSecondModal,
      AddRegularOfferThirdModal,
      AddRegularOfferFourthModal,
    }
  }, [])

  const [activeModal, setActiveModal] = useState([modals[defaultActiveModal]])

  const changeModal = useCallback(
    (modal: Modal) => setActiveModal([modals[modal]]),
    [modals],
  )

  return { Modal: activeModal[0], changeModal }
}

export default useModal
