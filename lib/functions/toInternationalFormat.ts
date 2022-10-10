export default (phoneNumber: string) => {
  return phoneNumber.replace(/^(\+33|0033|0)(\d{9})$/, '+33$2')
}
