import LoginModal from '@/components/desktop/modals/LoginModal'
import SettingsModal from '@/components/desktop/modals/SettingsModal'
import SignupCorporateFifthModal from '@/components/desktop/modals/signup/corporate/SignupCorporateFifthModal'
import SignupCorporateFirstModal from '@/components/desktop/modals/signup/corporate/SignupCorporateFirstModal'
import SignupCorporateFourthModal from '@/components/desktop/modals/signup/corporate/SignupCorporateFourthModal'
import SignupCorporateSecondModal from '@/components/desktop/modals/signup/corporate/SignupCorporateSecondModal'
import SignupCorporateSixthModal from '@/components/desktop/modals/signup/corporate/SignupCorporateSixthModal'
import SignupCorporateThirdModal from '@/components/desktop/modals/signup/corporate/SignupCorporateThirdModal'
import SignupPersonalFifthModal from '@/components/desktop/modals/signup/personal/SignupPersonalFifthModal'
import SignupPersonalFirstModal from '@/components/desktop/modals/signup/personal/SignupPersonalFirstModal'
import SignupPersonalFourthModal from '@/components/desktop/modals/signup/personal/SignupPersonalFourthModal'
import SignupPersonalSecondModal from '@/components/desktop/modals/signup/personal/SignupPersonalSecondModal'
import SignupPersonalThirdModal from '@/components/desktop/modals/signup/personal/SignupPersonalThirdModal'
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
      SignupCorporateFirstModal,
      SignupCorporateSecondModal,
      SignupCorporateThirdModal,
      SignupCorporateFourthModal,
      SignupCorporateFifthModal,
      SignupCorporateSixthModal,
      SettingsModal,
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
