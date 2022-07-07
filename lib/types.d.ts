export type Tag = {
  type: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
  number: number
}

export type TypeOfCuisineBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: SetStateAction<any>
  isDisabled: boolean
}

export type HonorsBottomSheetProps = {
  control: Control<any>
  isOpen: boolean
  setIsOpen: SetStateAction<any>
}
