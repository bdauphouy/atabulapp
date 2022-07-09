import LoginModal from '@/components/desktop/modals/LoginModal'
import SignupFirstModal from '@/components/desktop/modals/signup/SignupFirstModal'
import { useCallback, useMemo, useState } from 'react'
import { Modal } from '../types'

const useModal = (defaultActiveModal: Modal) => {
  const modals = useMemo(() => {
    return {
      LoginModal,
      SignupFirstModal,
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
