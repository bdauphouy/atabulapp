import Button from '../shared/Button'
import Modal from '../shared/Modal'

type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  return (
    <Modal
      title="Réserver une table"
      isOpen={isOpen}
      hasFooter={false}
      onClose={onClose}
    >
      <h3 className="text-lg font-bold text-black">Lundi 16 mars</h3>
      <div className="mb-2 flex items-center gap-6 py-4">
        <div className="rounded bg-white-rock py-1 px-2 text-xl font-medium text-scarlet">
          -30%
        </div>
        <div className="mr-auto">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-black">
              {'dinner' === 'dinner' ? 'Diner' : 'Déjeuner'}
            </h3>
            <span className="text-sm text-gray">2 per.</span>
          </div>
          <h4 className="text-sm uppercase text-gray">MENU + VIN</h4>
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 flex w-full flex-col items-center border-t-[1px] border-solid border-alto/60 py-8">
        <h3 className="uppercase text-gray">Réserver par téléphone</h3>
        <Button variant="tertiary">02 01 03 04 05</Button>
      </footer>
    </Modal>
  )
}

export default BookingModal
