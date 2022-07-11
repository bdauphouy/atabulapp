import { Dispatch, ReactNode, SetStateAction } from 'react'
import Sheet from 'react-modal-sheet'

type BottomSheetProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<any>>
  onClose?: () => void
  hasHeader?: boolean
  children: ReactNode
  snapPoints?: number[]
  initialSnap?: number
}

const BottomSheet = ({
  isOpen,
  setIsOpen,
  onClose = () => {},
  hasHeader = true,
  children,
  snapPoints,
  initialSnap,
}: BottomSheetProps) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
    >
      <Sheet.Container>
        {hasHeader && <Sheet.Header />}
        <Sheet.Content>
          <div className="px-5">{children}</div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => setIsOpen(false)} />
    </Sheet>
  )
}

export default BottomSheet
